import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';

const statusSteps = [
  'Order Placed',
  'Packing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const Orders = () => {
  const { backendURL, token, currency, perEach, perPair } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [visibleTrackOrderId, setVisibleTrackOrderId] = useState(null);

  // Append correct “per” string
  const formatUnit = (per) => {
    switch (per) {
      case '1':
        return perEach;
      case '2':
        return perPair;
      default:
        return '';
    }
  };

  // Toggle each order card’s expanded state
  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Fetch orders on mount / when token changes
  const loadOrders = async () => {
    try {
      if (!token) return;
      const res = await axios.post(
        `${backendURL}/api/order/userOrders`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrderData(res.data.orders.reverse());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token]);

  // Convert a status string into its index in statusSteps
  const getStepIndex = (status) => statusSteps.indexOf(status);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4 sm:px-8 md:px-16 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Page Title */}
        <div className="text-3xl font-bold mb-6">
          <Title text1="MY" text2="ORDERS" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ===================================== */}
          {/* Left Column: About Delivery */}
          <aside className="w-full lg:w-1/4 bg-white shadow-lg rounded-2xl p-6 text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-2">About Delivery</p>
            <p>
              AquaBounty ensures sustainable, reliable, and fast delivery of fresh seafood using
              climate-controlled logistics. Orders are typically processed within 24 hours and
              delivered within 2–5 business days depending on location.
            </p>
          </aside>

          {/* ===================================== */}
          {/* Right Column: List of Orders */}
          <section className="w-full lg:w-3/4 space-y-6 relative">
            {orderData.map((order, idx) => {
              const isExpanded = !!expandedOrders[order._id];
              const currentStep = getStepIndex(order.status);

              return (
                <div
                  key={order._id || idx}
                  className="bg-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl"
                >
                  {/* Header: Order Info + Toggle Arrow */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">
                        <span className="font-semibold text-gray-800">Order ID:</span>{' '}
                        <span className="font-mono">{order._id?.slice(0, 10)}...</span>
                      </p>
                      <p className="text-gray-600 text-sm mb-1">
                        <span className="font-semibold">Date:</span>{' '}
                        {new Date(order.date).toDateString()}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Payment:</span> {order.paymentMethod}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleOrder(order._id)}
                        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-300 transition"
                      >
                        {order.status}
                      </button>
                      <img
                        src={assets.down_arrow}
                        alt="Toggle"
                        onClick={() => toggleOrder(order._id)}
                        className={`w-6 h-6 cursor-pointer transform transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* ===================================== */}
                  {/* Expanded Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="mt-6 pt-6 border-t border-gray-200 space-y-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {/* —————————————————————————————— */}
                        {/* Desktop Horizontal Tracker (hidden < sm) */}
                        <div className="hidden sm:flex items-center w-full px-2 sm:px-4">
                          {statusSteps.map((stepName, sIdx) => {
                            const isActive = currentStep >= sIdx;
                            const isLast = sIdx === statusSteps.length - 1;

                            return (
                              <div
                                key={sIdx}
                                className="relative flex-1 flex flex-col items-center text-center"
                              >
                                {/* Line segment BEFORE this dot (all except first) */}
                                {sIdx !== 0 && (
                                  <div
                                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-0.5 ${
                                      currentStep >= sIdx ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                  />
                                )}

                                {/* Dot (centered in its flex-1 “bucket”) */}
                                <div
                                  className={`relative z-10 w-4 h-4 sm:w-6 sm:h-6 rounded-full ${
                                    isActive ? 'bg-green-500' : 'bg-white border-2 border-gray-300'
                                  }`}
                                />

                                {/* Line segment AFTER this dot (all except last) */}
                                {!isLast && (
                                  <div
                                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-0.5 ${
                                      currentStep > sIdx ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                  />
                                )}

                                {/* Label */}
                                <p
                                  className={`mt-2 text-[10px] sm:text-xs ${
                                    isActive ? 'text-green-600 font-semibold' : 'text-gray-400'
                                  }`}
                                >
                                  {stepName}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        {/* —————————————————————————————— */}
                        {/* Mobile “Track Delivery” Button (visible < sm) */}
                        <div className="flex justify-center sm:hidden">
                          <button
                            onClick={() => setVisibleTrackOrderId(order._id)}
                            className="bg-green-500 text-white px-4 py-2 text-sm rounded-full shadow-md"
                          >
                            Track Delivery
                          </button>
                        </div>

                        {/* —————————————————————————————— */}
                        {/* Order Items & Details */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="md:col-span-3 grid gap-5">
                            {order.items.map((item, iIdx) => (
                              <div key={iIdx} className="flex items-start gap-6 text-sm">
                                <img
                                  src={item.image?.[0]}
                                  alt={item.name}
                                  className="w-16 sm:w-20 h-auto object-cover rounded-lg border"
                                />
                                <div>
                                  <p className="text-base font-semibold text-gray-800">
                                    {item.name}
                                  </p>
                                  <div className="flex gap-4 mt-1 text-sm text-gray-600">
                                    <p>
                                      {currency}
                                      {item.price}
                                      {formatUnit(item.per)}
                                    </p>
                                    <p>Qty: {item.quantity}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* (Optional) Right Panel for Extra Info */}
                          {/* <div className="md:col-span-1">...</div> */}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* —————————————————————————————— */}
            {/* Full‐Screen Mobile Sidebar: “Sensei Style” */}
            <AnimatePresence>
              {visibleTrackOrderId && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-40 z-50 sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setVisibleTrackOrderId(null)}
                >
                  <motion.div
                    className="absolute inset-0 bg-white pt-8 pb-6 px-6 overflow-y-auto"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header Bar */}
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-2xl font-semibold text-gray-800">Delivery Status</h3>
                      <button
                        onClick={() => setVisibleTrackOrderId(null)}
                        className="text-gray-600 text-2xl leading-none"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Mobile Vertical Timeline */}
                    {orderData
                      .filter((o) => o._id === visibleTrackOrderId)
                      .map((order) => {
                        const currentStep = getStepIndex(order.status);

                        return (
                          <div key={order._id} className="relative pl-8">
                            {/* Gray base line (full height) */}
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-300" />

                            {/* Green progress line */}
                            <div
                              className="absolute left-6 top-0 w-px bg-green-500"
                              style={{
                                height: `${(currentStep + 1) * 72}px`,
                              }}
                            />

                            {statusSteps.map((stepName, sIdx) => {
                              const isActive = currentStep >= sIdx;

                              return (
                                <div key={sIdx} className="relative mb-6 h-12">
                                  {/* Dot */}
                                  <div
                                    className={`absolute left-[14px] top-3 w-5 h-5 rounded-full ${
                                      isActive
                                        ? 'bg-green-500'
                                        : 'bg-white border-2 border-gray-300'
                                    }`}
                                  />

                                  {/* Label */}
                                  <div className="pl-12">
                                    <p
                                      className={`text-lg ${
                                        isActive ? 'text-green-800 font-semibold' : 'text-gray-500'
                                      }`}
                                    >
                                      {stepName}
                                    </p>
                                    {/* 
                                      (Optional) Timestamp:
                                      <p className="text-sm text-gray-400 mt-1">
                                        Mon, 10th Feb ’25 – 11:01am
                                      </p> 
                                    */}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Orders;
