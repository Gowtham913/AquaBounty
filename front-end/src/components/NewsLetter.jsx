import React from 'react'

const NewsLetter = () => {

const onSubmit = (event) => {
  event.preventDefault();
}

  return (
    <div className='text-center'>
      <hr />
      <p className='text-2xl font-medium mt-3'> Shop now & get 10% off </p>
      <p className='mt-3 text-gray-400'>AquaBounty is a secure online platform to buy aquarium fishes from direct renders and breeders</p>

      <form className='w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
