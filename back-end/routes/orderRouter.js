import express from 'express'
import {placeOrderPhonePay, placeOrderGooglePay, placeOrderPayTM, allOrders, userOrders, updateStatus} from '../controlers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list',adminAuth ,allOrders)  // admin
orderRouter.post('/status',adminAuth ,updateStatus)  //admin

//payment features
orderRouter.post('/placeppay',authUser,placeOrderPhonePay)
orderRouter.post('/placegpay',authUser,placeOrderGooglePay)
orderRouter.post('/placeptm',authUser,placeOrderPayTM)

// User Feature
orderRouter.post('/userOrders',authUser,userOrders)

export default orderRouter;