import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Fotter from './components/Fotter';
import SearchBar from './context/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 lg:px-[4vw]'>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        toastClassName="my-toast"
        bodyClassName="my-toast-body"
        progressClassName="my-toast-progress"
        closeButton={false}
      />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collections' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/products/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/placeOrders' element={<PlaceOrder/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Fotter/>
    </div>
  );
};

export default App;
