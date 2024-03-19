import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import paymentRoute from "./routes/payment.js";
import orderRoute from "./routes/order.js";
import statRoute from "./routes/stats.js";
import cartRoute from "./routes/cart.js";
import { errorMiddleware } from "./middlewares/error.js";
import { singleUpload } from "./middlewares/multer.js";
import NodeCache from "node-cache";

config({
  path: "./.env",
}); 

const app = express();
app.use(express.json())
const Port =  process.env.PORT || 8000;

const URI = process.env.DB_URL || 'mongodb://localhost:27017/mydatabase';

export const myCache = new NodeCache();
// Connect to the database
async function main() {
  await mongoose.connect(URI,{
    dbName: "Ecommerce",
  });
  console.log('database connected');
}
main().catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});


// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", statRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware)

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
