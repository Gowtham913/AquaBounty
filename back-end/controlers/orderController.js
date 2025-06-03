import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken');
const { sign } = jwt;


function generateUpiLink(app, upiId, amount, payeeName) {
  const note = "Order Payment";
  const transactionRef = Date.now(); // optional transaction ref
  const baseParams = `pa=${upiId}&pn=${encodeURIComponent(payeeName)}&tn=${encodeURIComponent(note)}&am=${amount}&cu=INR&tr=${transactionRef}`;

  switch (app.toLowerCase()) {
    case "phonepe":
      return `phonepe://pay?${baseParams}`;
    case "gpay":
    case "googlepay":
      return `tez://upi/pay?${baseParams}`;
    case "paytm":
      return `paytmmp://pay?${baseParams}`;
    default:
      return `upi://pay?${baseParams}`;
  }
}

const placeOrderPhonePay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderId = sign({ userId, timestamp: Date.now() }, JWT_SECRET);
    const orderData = {
      userId,
      items,
      address,
      orderId,
      amount,
      paymentMethod: "phonePay",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // ✅ Correct usage here
    const upiLink = generateUpiLink("phonepe", "7676245303913@ybl", amount, "AquaBounty");

    res.json({ success: true, message: "Order Placed", amount});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Google Pay Payment
const placeOrderGooglePay = async (req, res) => {

};

// PayTM Payment
const placeOrderPayTM = async (req, res) => {
  
};

// aLL orders data for admin panel
const allOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
} 

//user Order data for front-end
const userOrders = async(req,res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
} 

//update Order status
const updateStatus = async(req,res) => {
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
} 

export {placeOrderPhonePay, placeOrderGooglePay, placeOrderPayTM, allOrders, userOrders, updateStatus};