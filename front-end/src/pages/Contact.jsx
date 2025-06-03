import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div >
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_us} className='md:max-w-[480px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Website</p>
          <p className='text-gray-500'>any address for next</p>
          <p className='text-gray-500'>Tel: +1 912-612-9698 <br /> Email: aquabounty@gmail.com</p>
          <p className='font-semibold text-gary-600'>Careers at AquaBounty</p>
          <p className='text-gray-500'>Learn more about us</p>
          <button className='border border-black px-8 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore</button>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default Contact
