import express from "express";
import { deleteUser, forgetPassword, getAllUsers, getUser, login, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();


// Route - /api/v1/user/new
app.post("/new", newUser);


app.post("/login", login);

// Route - /api/v1/user/all
app.get("/all", adminOnly ,getAllUsers);


// Route - /api/v1/user/forget-password
app.post("/forget-password" ,forgetPassword);

// Route - /api/v1/user/dynamicID
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);

export default app;




