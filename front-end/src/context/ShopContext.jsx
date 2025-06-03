import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();
const backendURL = import.meta.env.VITE_BACKEND_URL

const ShopContextProvider = (props) => {
  const currency = "₹";
  const perEach = "/-";
  const perPair = "/pair";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token,setToken] = useState('')

  const navigate = useNavigate();

  // ✅ Add to cart
  const addToCart = async(itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    if(token) {
      try {
        await axios.post(backendURL + '/api/cart/add',{itemId},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };

  // ✅ Get total item count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, val) => acc + (val > 0 ? val : 0), 0);
  };

  // ✅ Update item quantity
  const updateQuantity = async(itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    if(token) {
      try {
        await axios.post(backendURL + '/api/cart/update', {itemId, quantity}, {headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };

  // ✅ Get total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  // ✅ Delivery fee logic
  const deliveryFee = () => {
    const amount = getCartAmount();
    if (amount === 0) return 0;
    if (amount < 250) return 80;
    if (amount < 500) return 120;
    if (amount < 800) return 200;
    if (amount < 1000) return 280;
    return 400;
  };

  // ✅ Fetch Product Details
  const getProductData = async() => {
    try {
      const response = await axios.get(backendURL + '/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)
      }
      else toast.error(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const getUsercart = async(token) => {
    try {
      const response = await axios.post(backendURL + '/api/cart/get',{},{headers:{token}})
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getProductData();
  },[])

  useEffect(()=> {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUsercart(localStorage.getItem('token'))
    }
  },[])

  const value = {
    products,
    currency,
    perEach,
    perPair,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    deliveryFee,
    getProductData,
    setToken,token,
    backendURL,
    setCartItems
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;