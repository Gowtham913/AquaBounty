import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify'
import { currency } from '../App'
import { assets } from '../assets/assets'

const List = ({token}) => {

  const [list,setList] = useState([])

  const fetchList = async() => {
    try {
      const response = await axios.get(backendURL + '/api/product/list')
      console.log(response.data);
      
      if(response.data.success) {
        setList(response.data.products)
      }
      else toast.error(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const remove = async(id) => {
    try {
      const response = await axios.post(backendURL + '/api/product/remove',{id},{headers:{token}})
      if(response.data.success) {
        toast.success(response.data.message || "Item Deleted Successfully")
        await fetchList()
      }
      else toast.error(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2 font-semibold text-lg'>All Product List</p>
      
      <div className='flex flex-col gap-2'>
        {/* Table Headers for md and above */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border border-gray-100 text-sm bg-gray-200 font-medium'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {
          list.map((item, index) => (
            <div 
              key={index}
              className='grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border border-gray-100 text-sm gap-2'
            >
              {/* Image */}
              <img 
                src={item.image[0]} 
                alt={item.name}
                className='w-16 rounded-md'
              />

              {/* Name */}
              <p className='truncate'>{item.name}</p>

              {/* Category (hide on small) */}
              <p className='hidden md:block'>{item.category}</p>

              {/* Price (hide on small) */}
              <p className='hidden md:block'>
                {currency} {item.price}{Number(item.per) === 1 ? "/-" : "/pair"}
              </p>

              {/* Delete Action */}
              <button 
                onClick={() => remove(item._id)} 
                className='flex justify-center text-red-500 hover:underline'
              >
                <img src={assets.x_mark} className='w-4' alt="" />
              </button>
            </div>
          ))
        }
      </div>
    </>

  )
}

export default List
