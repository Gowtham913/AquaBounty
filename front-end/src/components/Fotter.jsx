import React from 'react'
import { assets } from '../assets/assets'

const Fotter = () => {
  return (
    <div className='mt-10'>
      <hr />
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-fill text-gray-600'>
                text
            </p>
        </div>
        <div className='flex flex-row'>
          <div className='mr-20'>
              <p className='text-xl font-medium mb-5'>
                  Company
              </p>
              <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
              </ul>
          </div>
          <div>
            <p className='text-xl font-medium mb-5'>Get in Touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1 912-612-9698</li>
                <li>aquabounty@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ aquabounty.com -All Right Reserved</p>
      </div>
    </div>
  )
}

export default Fotter
