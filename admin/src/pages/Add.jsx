import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Select from 'react-select';
import axios from 'axios'
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const category = [
  { value: 'guppy', label: 'Guppy' },
  { value: 'molly', label: 'Molly' },
  { value: 'betta', label: 'Betta' },
  { value: 'gold', label: 'Gold' },
  { value: 'shark', label: 'Shark' },
  { value: 'platty', label: 'Platty' }
];

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [ctgry, setCtgry] = useState('');
  const [per, setPer] = useState('');
  const [size, setSize] = useState('');

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",desc)
      formData.append("price",price)
      formData.append("category",ctgry)
      formData.append("size",size)
      formData.append("per",per)
      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendURL + "/api/product/add",formData,{headers:{token}})
      if(response.data.success) {
        toast.success(response.data.message || 'Product added successfully!');
        setName('')
        setDesc('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setCtgry(null)
        setSize('')
        setPer('')
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
        {/* Image Upload Section */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Upload Image</p>
          <div className="flex gap-2">
            {[image1, image2, image3, image4].map((img, i) => (
              <label key={i} htmlFor={`image${i + 1}`}>
                <img className="w-20" src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (i === 0) setImage1(file);
                    if (i === 1) setImage2(file);
                    if (i === 2) setImage3(file);
                    if (i === 3) setImage4(file);
                  }}
                  type="file"
                  id={`image${i + 1}`}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="w-full max-w-[500px]">
          <label className="mb-2 block text-sm font-medium text-gray-700">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-black"
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        {/* Product Description */}
        <div className="w-full max-w-[500px]">
          <label className="mb-2 block text-sm font-medium text-gray-700">Product Description</label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-black resize-none"
            placeholder="Write content here"
            rows={4}
            required
          />
        </div>

        {/* Category & Price */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[500px]">
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-gray-700">Product Category</label>
            <Select
              options={category}
              value={category.find(opt => opt.value === ctgry) || null}
              onChange={(selected) => setCtgry(selected.value)}
              placeholder="Select category"
              isSearchable
            />
          </div>

          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-gray-700">Product Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-black"
              type="number"
              placeholder="eg. 25"
            />
          </div>
        </div>

        {/* Size & Type */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[500px]">
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-gray-700">Product Size</label>
            <input
              onChange={(e) => setSize(e.target.value)}
              value={size}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-black"
              type="text"
              placeholder="eg: -inch/mm/cm"
              required
            />
          </div>

          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-gray-700">Product Type</label>
            <input
              onChange={(e) => setPer(e.target.value)}
              value={per}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none focus:border-black"
              type="text"
              placeholder="eg: 1/2"
              required
            />
          </div>
        </div>

        <button type="submit" className="w-28 rounded-md py-1 mt-4 bg-black text-white">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
