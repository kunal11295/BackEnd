import { v4 as uuidv4 } from 'uuid';
import User from '../model/User.js';

// export const otpRegisteration = async (req,res) => {

//     try{
//         const { number,email} = req.body;
 
//         if(!number) return res.send("Number is Required");
//         if(!email) return res.send("Email is Required");

//         var code = uuidv4();
//         // res.send(code);

//         const isnumberpresent = await User.find({number}).exec();
//         if(isnumberpresent.length) res.send("Number is already present")

//         const isemailpresent = await User.find({email}).exec();
//         if(isemailpresent.length) res.send("Email is already present")

//         const user = new User({
//             email:email,
//             number:number,
//             otp:code
//         })
//         await user.save();
//         res.send("check your Mobie Number and gmail for otp!");
//     }
//     catch(error)
//     {
//         return res.send(error)
//     }
// }
export const otpRegistration = async (req, res) =>{
    try{
        const {number, email} = req.body;
        if(!number) return res.send("number not found.")
        if(!email) return res.send("email not found.")
        // var code = uuidv4();
        var codeforNumber = uuidv4();
        var codeforEmail = uuidv4();
        // res.send(code);

        const isNummberPresent = await User.find({number}).exec();
        if(isNummberPresent.length) return res.send("Number already used")
        
        const isEmailPresent = await User.find({email}).exec();
        if(isEmailPresent.length) return res.send("Email already used")

        const user = new User({
            email : email,
            number : number,
            // otp : code
            otpnumber : codeforNumber,
            otpemail : codeforEmail, 
        })
        await user.save();
        res.send("Check your mobile number  for otp.")

    }catch(error){
        return res.send(error);
    }
}




//     try{
//         const {number,otp} = req.body;
//         if(!number) return res.send("Number is Required!");
//         if(!otp) return res.send("otp is Required!");

//         const user = await User.find({number}).exec();

//         if(!user.length) return res.send("user not found");

//         if(user[0].otpnumber == otp)
//         {
//             const user = await User.find({ number }).exec();
//             await user.save();
//             return res.send("number is verified")
//         }
//         return res.send("otp is wrong");
//     }
//     catch(error)
//     {
//        return res.send(error);
//     }
// }
export const otpCheckForNumber = async (req,res) => {
    try{
        const {number,otp} = req.body;
        if(!number) return res.send("number is required");
        // if(!email) return res.send("email is required");
        if(!otp) return res.send("otp is required");

        const user = await User.find({number}).exec();
        if(!user.length) return res.send("user not found");

        if(user[0].otpnumber == otp){

            // const user = await Users.updateOne({ number }, { $set: { isNumberVerified: true } });
            const user = await User.findOneAndUpdate({ number },{ isNumberVerified: true }).exec();
            await user.save();
            // res.send("Check your mobile number  for otp.")
         return res.send("Number is verified");

        }
        return res.send("otp wrong!");  
        // return res.send(user[0])
    }catch(error){
        return res.send(error);
    }
}


export const otpCheckForEmail = async (req,res) => {
    try{
        const {email,otp} = req.body;
        if(!email) return res.send("email is required");
        // if(!email) return res.send("email is required");
        if(!otp) return res.send("otp is required");

        const user = await User.find({email}).exec();
        if(!user.length) return res.send("user not found");

        if(user[0].otpemail == otp){

            // const user = await Users.updateOne({ number }, { $set: { isNumberVerified: true } });
            const user = await User.findOneAndUpdate({email }, { isNumberVerified: true }).exec();
            await user.save();
            // res.send("Check your mobile number  for otp.")
         return res.send("Email is verified");

        }
        return res.send("otp wrong!");  

        // return res.send(user[0]);


    }catch(error){
        return res.send(error);
    }
}

export const otpLogin = async (req, res) => {
    try {
        const { email, number } = req.body;
        if (!email) return res.send("Email is required!")
        if (!number) return res.send("Number is required!")

        const user = await User.find({ email, number }).exec();
        if (!user) return res.send("User is not found!");
        console.log(user, "user")
        const userId = user[0]?._id;
        const codeForLoginEmail = uuidv4();
        const codeForLoginNumber = uuidv4();
        const updateUser = await User.findByIdAndUpdate({ _id: userId },
            {
                loginOtpForEmail: codeForLoginEmail, codeForLoginNumber: codeForLoginNumber,
                isloginEmailVerified: false, isloginNumberVerified: false
            }).exec();
        await updateUser.save();
        res.send("Check you email or number for otp.");

    } catch (error) {
        res.send(error)
    }
}


export const loginOtpCheckForEmail = async (req, res) => {
    try {
        const { otp, number, email } = req.body;
        if (!otp) return res.send("Otp not found!")
        if (!number) return res.send("Number not found!")
        if (!email) return res.send("Email not found!")

        const user = await User.find({ number, email }).exec();

        if (user[0].loginOtpForEmail == otp) {
            const user = await User.findOneAndUpdate({ email }, { isloginEmailVerified: true }).exec();
            await user.save();
            return res.send("Login Successful.")
        }
        return res.send('Otp is wrong!');
    } catch (error) {
        return res.send(error)
    }
}
export const loginOtpCheckForNumber = async (req, res) => {
    try {
        const { otp, number, email } = req.body;
        if (!otp) return res.send("Otp not found!")
        if (!number) return res.send("Number not found!")
        if (!email) return res.send("Email not found!")

        const user = await User.find({ number, email }).exec();

        if (user[0].codeForLoginNumber == otp) {
            const user = await User.findOneAndUpdate({ number }, { isloginNumberVerified: true }).exec();
            await user.save();
            return res.send("Login Successful.")
        }
        return res.send('Otp is wrong!');
    } catch (error) {
        return res.send(error)
    }
}

export const AddProduct = async (req, res) => {
    try {
        const { email, productName, price, image } = req.body;
        if (!email) return res.send("Email is required!")
        if (!productName) return res.send("productName is required!")
        if (!price) return res.send("price is required!")
        if (!image) return res.send("image is required!")

        const user = await User.find({ email }).exec();
        if (!user) return res.send("User is not found!");
        // console.log(user, "user")
        const userId = user[0]?._id;
        const updateUser = await User.findByIdAndUpdate({ _id: userId },
            {
                $push: {
                    Product: {
                        $each: [{ productName: productName, price: price, image: image }]
                    }
                }
            }).exec();
        await updateUser.save();
        console.log(updateUser);
        res.send("Product added to cart");

    } catch (error) {
        res.send(error)
    }
}


export const RemoveProduct = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.send("Email is required!")

        const user = await User.find({ email }).exec();
        if (!user) return res.send("User is not found!");
        // console.log(user, "user")
        // const userId = user[0]?._id;
        const updateUser = await User.findOneAndUpdate({email },
            {
                $unset:{
                    Product: {
                         productName: "", price: "", image: ""
                    }
                }
            }).exec();
        await updateUser.save();
        res.send("Products removed!");

    } catch (error) {
        res.send(error)
    }
}