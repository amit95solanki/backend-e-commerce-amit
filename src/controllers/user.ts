import { NextFunction, Request, Response } from "express"
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import bcrypt  from  "bcrypt"
import {sendMail} from "../utils/mailer.js"
export const newUser = TryCatch(
    async(req:Request<{},{},NewUserRequestBody>,res:Response,next:NextFunction)=>{

  

        const { name, email, photo, gender,  dob,password } = req.body;
       
        let user =await User.findOne({email})

        if(user){
            return res.status(400).json({
                success : false,
                message:`Email alreadt exist`
            })
        }
          console.log("name, email, photo, gender,  dob, password ========>",name, email, photo, gender,  dob,password );

        if ( !name || !email || !photo || !gender || !dob || !password){
            return next(new ErrorHandler("Please add all fields", 400));
        }

           const hashPassword =  await bcrypt.hash(password ,10);
       

        const newUser = await User.create({name,email,photo,gender,dob:new Date(dob),password:hashPassword});

        let msg ='<p> hii ' +' '+ name + ',please <a href= "http://localhost:3000/dashboard"> verify </a> your mail. </p>'
        sendMail(email,"mail verification",msg)

        res.status(200).json({
            success : true,
            message:`wellcome ${newUser.name}`
        })
}
)


export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});
  
    return res.status(200).json({
      success: true,
      users,
    });
  });
  
  export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
  
    if (!user) return next(new ErrorHandler("Invalid Id", 400));
  
    return res.status(200).json({
      success: true,
      user,
    });
  });
  
  export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
  
    if (!user) return next(new ErrorHandler("Invalid Id", 400));
  
    await user.deleteOne();
  
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });