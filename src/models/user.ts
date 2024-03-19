import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  // _id: string;
  name: string;
  email: string;
  password?:string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  is_Verified ?: number;
  //   Virtual Attribute
  age: number;
}

const schema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: [true, "Please enter ID"],
    // },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter Name"],
      validate: validator.default.isEmail,
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
    },
    photo: {
      type: String,
      required: [true, "Please add Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter Gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter Date of birth"],
    },
    
      is_Verified:{
        type: Number,
        default: 0, // 1 verified
      }
    
  },

  {
    timestamps: true,
  }
);

schema.virtual("age").get(function () {
  const today = new Date();
  const dob:any = this.dob;
  let age:any = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

export const User = mongoose.model<IUser>("User", schema);