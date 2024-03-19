import { NextFunction, Request, Response } from "express"
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import bcrypt  from  "bcrypt"
import {sendMail} from "../utils/mailer.js"
import randomstring from "randomstring"
import { Resetpassword } from "../models/passwordReset.js";
import jwt , { Secret } from "jsonwebtoken"
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

        // let msg ='<p> hii ' +' '+ name + ',please <a href= "http://localhost:3000/dashboard"> verify </a> your mail. </p>'

        let msg =`Congratulations! ${name} You have successfully registered at Macho Man Shop. Welcome to the Macho Man community!`
        sendMail(email,"Registration Successfull",msg)

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

  

  export const forgetPassword = TryCatch(async (req, res, next) => {
   const {email } =  req.body


   let user = await User.findOne({email})
   
  //  console.log(email,"amit",user);


   if(!user){
       return res.status(400).json({
           success : false,
           message:`Email doesn't  exists`
       })
   }

   const randomString :string =  randomstring.generate()
   let msg =`Congratulations! ${user.name} You have successfully registered at Macho Man Shop. Welcome to the Macho Man community!`
  
   let passwordReset =new Resetpassword({
    user_id:user._id,
    token:randomString,
   })

   await passwordReset.save()
   sendMail(user.email,"Reset password",msg)
  
    return res.status(200).json({
      success: true,
      message: "reset password send Successfully",
    });
    
  });

  const getResetPassword =TryCatch(async (req, res, next) => {
    if (req.params.token === undefined)return next(new ErrorHandler("invalid token", 400));
    let resetData = await Resetpassword.findOne({token:req.params.token})
    return res.status(200).json({
      success: true,
      message: "User token checked successfully",
    });
  });

  const updatePassword = TryCatch(async (req, res, next) => {
    const {user_id,password,c_password} = req.body

    const resetData = await Resetpassword.findById(user_id);
  
    // if (!resetData) return next(new ErrorHandler("Invalid Id", 400));

    const hashPassword = await bcrypt.hash(c_password,10);

   await User.findByIdAndUpdate({_id:user_id},{
      $set:{
        password:hashPassword
      }
    }
    )
    await Resetpassword.deleteMany({user_id})
    
    
  
    return res.status(200).json({
      success: true,
      message: "User password updated Successfully",
    });
  });


  const generateAccessToken = (user: any) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '1h' });
    return token;
};

  export const login =TryCatch(async (req, res, next) => {

    const {email,password} = req.body

    const userData =await User.findOne({email})

    if(!userData) return next(new ErrorHandler("Invalid email - password", 401));

      const passwordMatch = await bcrypt.compare(password,userData.password!)
    
      if(!passwordMatch) return next(new ErrorHandler("Invalid email - password", 401));

      if(userData.is_Verified === 0) return next(new ErrorHandler("please verify your accout", 402));

     const accessToken =  await generateAccessToken({user:userData})

    return res.status(200).json({
      success: true,
      message: "User login  successfully",
      accessToken,
      user:userData,
      tokenType:"Bearer"
    });
  });
