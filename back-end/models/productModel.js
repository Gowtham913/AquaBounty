import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    per:{type:String,required:true},
    size:{type:String,required:true},
    date:{type:Number,required:true}
})

const productModel = mongoose.model("product",productSchema) || mongoose.model.product

export default productModel