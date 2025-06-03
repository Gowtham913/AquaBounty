import React, { use, useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);

  const [category,setCategory] = useState([]);

  const [sortType,setSortType] = useState('relevant');

  const {showSearch,search} = useContext(ShopContext);
  
  const toogleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item != e.target.value))
    }
    else {
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let pdcopy = products.slice();

    if (showSearch && search) {
      pdcopy = pdcopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0) {
      pdcopy = pdcopy.filter(item => category.includes(item.category));
    }
    setFilterProducts(pdcopy)
  }

  const sortProduct = () => {
    let fpcopy = filterProducts.slice();
    switch(sortType) {
      case 'low-high':
        fpcopy.sort((a, b) => a.price - b.price);
        setFilterProducts(fpcopy);
        break;
      case 'high-low':
        fpcopy.sort((a, b) => b.price - a.price);
        setFilterProducts(fpcopy);
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  

  
  useEffect(() => {
    applyFilter();
  }, [products,category,search,showSearch]);
  
  return (
    <div className='flex flex-col sm:flex-row gap-3 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'> CATEGORIES
          <img src={assets.back_icon} className={`h-3 sm:hidden ${showFilter? 'rotate-90':''}`}/>
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'guppy'} onChange={toogleCategory}/> Guppy
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'molly'} onChange={toogleCategory}/> Molly
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'betta'} onChange={toogleCategory}/> Betta Fish
            </p>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
                per={item.per}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;
