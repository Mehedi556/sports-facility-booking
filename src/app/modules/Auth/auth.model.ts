
import { Schema, model } from "mongoose";
import { TSignup } from "./auth.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const signupSchema = new Schema<TSignup>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [ "admin", "user"],
        required: true,
        default: "user"
    },
    address: {
        type: String,
        required: true,
    },

})

signupSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  
    next();
  });

export const User = model<TSignup>('User', signupSchema)
