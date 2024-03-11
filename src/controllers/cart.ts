import {Cart} from "../models/cart.js"
import { Request, Response } from "express";


export const fetchCartByUser = async (req:Request, res : Response) => {
    const { id: user } = req.query;
  try {
    const cartItems = await Cart.find({ user}).populate('product');

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addToCart = async (req: Request, res: Response) => {
   
    const { quantity, product ,user} = req.body;

    try {
        // Create a new Cart instance
        const cart = new Cart({
            quantity,
            product,
            user
        });

        // Save the cart document
        const savedCart = await cart.save();

        // Respond with the saved cart document
        res.status(201).json(savedCart);
    } catch (err) {
        // Handle errors
        res.status(400).json(err);
    }
};

export const deleteFromCart = async (req:Request, res : Response) => {
    const { id } = req.params;
    try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};



export const updateCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const cart = await Cart.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      // Check if cart is null
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const result = await cart.populate('product');
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  };