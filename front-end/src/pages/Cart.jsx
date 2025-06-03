import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const {products,currency,cartItems,perPair,perEach,updateQuantity, navigate} = useContext(ShopContext);
  const [cartData,setCartData] = useState([]);

  useEffect(()=> {
    if (products.length > 0) {
      const tempData = [];
      for(const items in cartItems) {
        if(cartItems[items] > 0) {
          tempData.push( {
            _id: items,
            quantity: cartItems[items]
          })
        }
      }
      setCartData(tempData); 
    }
  },[cartItems],products)

  const SetPer = (product) => {
    switch (product.per) {
      case '1':
        return perEach;
      case '2':
        return perPair;
      default:
        return '';
    }
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className=''>
        {
          cartData.map((item,index) => {
            const productData = products.find((product)=> product._id === item._id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-3'>
                  <img src={productData.image[0]} className='w-20 sm:w-20' alt="" />
                  <div className=''>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5'>
                      <p>{currency}{productData.price}{SetPer(productData)}</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-400 rounded-md p-2 sm:w-[9rem] w-[8rem] flex items-center gap-2">
                  <p className="text-sm text-black whitespace-nowrap ml-1">Quantity:</p>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className="border px-1 py-0.5 border-gray-500 rounded-sm bg-gray-300 text-sm w-[40px] sm:w-[50px]"/>
                </div>
                <img onClick={()=> updateQuantity(item._id,0)} className='w-4 sm:w-5 mr-4 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/placeOrders')} className='bg-black text-white text-sm my-8 px-8 rounded-2xl py-3'>BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
