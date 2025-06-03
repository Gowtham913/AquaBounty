import React, { useState, useEffect, useContext } from 'react';
import { Listbox } from '@headlessui/react';
import { getIndiaState, getIndiaDistrict } from 'india-state-district';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const PlaceOrder = () => {
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [districtList, setDistrictList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    place: '',
    pincode: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const [method, setMethod] = useState('phonePay');

  const { deliveryFee, navigate, backendURL, token, cartItems, setCartItems, getCartAmount, products } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItem = [];
      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === items));
          if (itemInfo) {
            itemInfo.quantity = cartItems[items];
            orderItem.push(itemInfo);
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItem,
        amount: getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee(),
        method: method
      };

      const response = await axios.post(backendURL + '/api/order/placeppay', orderData, { headers: { token } });
      if (response.data.success) {
        setCartItems({});
        toast.success(response.data.message)
        console.log(response.data);
        console.log("Your amount is" + response.data.amount );
      } else {
        toast.error(error.message);
        console.log("Something went wrong");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setStateList(getIndiaState());
  }, []);

  useEffect(() => {
    if (selectedState?.code) {
      setDistrictList(getIndiaDistrict(selectedState.code));
      setSelectedDistrict(null);
      onChangeHandler({ target: { name: 'state', value: selectedState.state } });
    } else {
      setDistrictList([]);
      setSelectedDistrict(null);
      onChangeHandler({ target: { name: 'state', value: '' } });
    }
  }, [selectedState]);

  useEffect(() => {
    onChangeHandler({ target: { name: 'district', value: selectedDistrict || '' } });
  }, [selectedDistrict]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-2 pt-6 sm:pt-16 px-4 min-h-[80vh] border-t bg-white">
      <div className="flex flex-col gap-5 w-full sm:max-w-[500px]">
        <div className="text-xl font-semibold text-gray-800">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" className="border rounded-lg py-2 px-4 w-full text-sm" required />
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" className="border rounded-lg py-2 px-4 w-full text-sm" required />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email address" className="border rounded-lg py-2 px-4 w-full text-sm" type="email" required />
          <div className="flex border rounded-lg py-2 px-4 w-full sm:w-[244px] items-center">
            <span className="text-gray-500 pr-2">+91</span>
            <input name="phone" value={formData.phone} onChange={onChangeHandler} className="flex-1 outline-none text-sm" placeholder="Phone number" type="text" required />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-[244px]">
            <Listbox value={selectedState} onChange={setSelectedState}>
              <div className="relative">
                <Listbox.Button className="w-full text-left text-sm border rounded-lg py-2 px-4">
                  {selectedState ? selectedState.state : 'Select State'}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-sm shadow-md">
                  {stateList.map((state) => (
                    <Listbox.Option
                      key={state.code}
                      value={state}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${active ? 'bg-blue-100 text-blue-800' : 'text-gray-900'}`
                      }
                    >
                      {state.state}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
          <div className="w-full sm:w-[244px]">
            <Listbox value={selectedDistrict} onChange={setSelectedDistrict} disabled={!selectedState}>
              <div className="relative">
                <Listbox.Button className="w-full text-left text-sm border rounded-lg py-2 px-4">
                  {selectedDistrict || 'Select District'}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-sm shadow-md">
                  {districtList.map((district, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={district}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${active ? 'bg-blue-100 text-blue-800' : 'text-gray-900'}`
                      }
                    >
                      {district}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input name="place" value={formData.place} onChange={onChangeHandler} placeholder="City Name" className="border rounded-lg py-2 px-4 w-full text-sm" required />
          <input name="pincode" value={formData.pincode} onChange={onChangeHandler} placeholder="PINCODE" className="border rounded-lg py-2 px-4 w-full text-sm" required />
        </div>
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('phonePay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'phonePay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.phone_pay} className='h-5 mx-4' alt="PhonePe" />
            </div>
            <div onClick={() => setMethod('payTM')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'payTM' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.paytm} className='h-5 mx-4' alt="Paytm" />
            </div>
            <div onClick={() => setMethod('googlePay')} className='flex items-center gap-3 border p-2 px-2 cursor-pointer'>
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'googlePay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.google_pay} className='h-4 mx-4' alt="Google Pay" />
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
            >
              Place Order & Pay via {method === 'phonePay' ? 'PhonePe' : method === 'googlePay' ? 'Google Pay' : 'Paytm'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;