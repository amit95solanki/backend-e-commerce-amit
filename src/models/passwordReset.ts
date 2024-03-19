import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref:"User"
    },
    token: {
        type: String,
        required: true,
      },
  },
 
);

export const Resetpassword = mongoose.model("PasswordReset", schema);
