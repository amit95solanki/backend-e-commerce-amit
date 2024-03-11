import mongoose, { Schema } from "mongoose";



const cartSchema = new mongoose.Schema({
    quantity: { type : Number, required: true},
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
    user:{ type: String, ref: 'User', required: true},
 
})




export const Cart = mongoose.model('Cart',cartSchema)