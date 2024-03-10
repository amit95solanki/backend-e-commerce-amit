import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import paymentRoute from "./routes/payment.js";
import orderRoute from "./routes/order.js";
import statRoute from "./routes/stats.js";
import { errorMiddleware } from "./middlewares/error.js";
import { singleUpload } from "./middlewares/multer.js";
import NodeCache from "node-cache";
const app = express();
app.use(express.json())
const Port = 8000;
const URI = "mongodb+srv://user:amitsolanki95@ecommerce.cit0fpc.mongodb.net/?retryWrites=true&w=majority";
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
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware)

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
