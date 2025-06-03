import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollec = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);  // always add 'products' in dependency array

  return (
    <div className='my-6'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Latest'} text2={'Collection'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Best fishes are available at low maintenance and cheap prices. Breeding pairs are also available for livebearer fishes.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              per={item.per}
            />
          ))
        }
      </div>
    </div>
  );
}

export default LatestCollec;
