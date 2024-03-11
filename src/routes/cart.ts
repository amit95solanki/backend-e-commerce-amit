import express from "express";
import { addToCart, deleteFromCart, fetchCartByUser, updateCart } from "../controllers/cart.js";



const app = express.Router();


// Route - /api/v1/cart
app.post("/", addToCart);


// Route - /api/v1/user
app.get("/", fetchCartByUser);

// Route - /api/v1/user/
app.route("/:id").patch(updateCart).delete(deleteFromCart);

export default app;
