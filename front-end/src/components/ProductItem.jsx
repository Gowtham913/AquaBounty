import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price,per}) => {

    const{currency} = useContext(ShopContext);
    const{perEach} = useContext(ShopContext);
    const{perPair} = useContext(ShopContext);

    const SetPer = () => {
      switch (per) {
        case '1':
          return perEach;
        case '2':
          return perPair;
        default:
          return '';
      }
    };
    
    return (
      <Link className='text-gray-700 cursor-pointer' to={`/products/${id}`}>
        <div className='overflow-hidden'>
          <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>
          {currency}{price} {SetPer()}
        </p>
      </Link>
    );
    
}

export default ProductItem;
