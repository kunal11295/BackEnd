import mongoose from "mongoose";
import { Schema } from "mongoose";
import { object } from "webidl-conversions";

const user = new Schema({
    name:String,
    email:String,
    // otp:String,
    password:String,
    number:Number,
    otpnumber:String,
    otpemail:String,
    loginOtpForEmail:String,
    codeForLoginNumber:String,
    Product:[]
});

export default mongoose.model("User",user)