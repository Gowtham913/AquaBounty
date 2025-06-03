import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Related from '../components/Related';

const Product = () => {
  const { productId } = useParams();
  const { products,currency,perPair,perEach,addToCart} = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const [prodname,setprodname] = useState('');


  useEffect(() => {
    const fetchDetails = () => {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0]);
        setprodname(foundProduct.name);
      }
    };

    fetchDetails();
  }, [productId, products]);

  const SetPer = () => {
      switch (productData.per) {
        case '1':
          return perEach;
        case '2':
          return perPair;
        default:
          return '';
      }
  }

  const pstate = () => {
    switch (productData.per) {
        case '1':
          return "";
        case '2':
          return "Breeding pair: 1-Male, 1-Female";
        default:
          return '';
      }
  }

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-center sm:justify-normal sm:w-[18.7%] w-full gap-4 sm:gap-2'>
            {
              productData.image.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  onClick={() => setImage(item)}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                  alt=""
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[700px]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl'>{productData.name}</h1>
          <div className='flex items-center gap-0.3 mt-2'>
            <img src={assets.full_star_icon} alt="" className="w-3.5" />
            <img src={assets.full_star_icon} alt="" className="w-3.5" />
            <img src={assets.full_star_icon} alt="" className="w-3.5" />
            <img src={assets.full_star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <p className='pl-2 '>( 132 )</p>
          </div>
          <p className='text-blue-600 mt-3 text-2xl font-medium'>{currency}{productData.price}{SetPer()}</p>
          <p className='mt-3 text-gray-500 w-full'>{productData.descrip}</p>
          <button onClick={() => addToCart(productData._id)} className='bg-black text-white px-10 mt-4 py-3 text-sm rounded-2xl active:bg-gray-700'>
              ADD TO CART
          </button>
          <hr className='mt-8'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Healthy Fish</p>
            <p>Premier Quality</p>
            <p>{pstate()}</p>
          </div>
        </div>
      </div>
      <hr className='mt-8'/>
      <div className='mt-10'>
        <div className='flex'>
          <b className='border px-5 py-3 text-base'>Description</b>
          <p className='border px-5 py-3 text-base'>Reviews  (132)</p>
        </div>
        <div className='flex flex-cl gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>text</p>
          <p>text2</p>
        </div>
      </div>

      <Related category={productData.category} prodId={productData._id}/>

    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;