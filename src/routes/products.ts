import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProduct, getAllCategories, getAllProducts, getLatestProduct, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// console.log("singleUpload",singleUpload);


//To Create New Product  - /api/v1/product/new
app.post("/new",adminOnly,  singleUpload, newProduct);

//To get latest product  - /api/v1/product/latest
app.get("/latest", getLatestProduct);

//To get all  product  - /api/v1/product/all
app.get("/all", getAllProducts);

//To all latest categories  - /api/v1/product/categories
app.get("/category", getAllCategories);

//To Create all product  - /api/v1/product/get all product see for admin
app.get("/admin-product", getAdminProduct);

// Route -  /api/v1/user/dynamicID
app.route("/:id").get(getSingleProduct).put(singleUpload,updateProduct).delete(deleteProduct);

export default app;






