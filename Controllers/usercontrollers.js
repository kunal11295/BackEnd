import User from "../model/User.js"

export const register = async (req,res) => {
    
    try{
        const { userName,userEmail,userPassword,userConfirmpassword}= req.body
        if(!userName) return res.send("user name is required !");
        if(!userEmail) return res.send("user Email is required !"); 
        if(!userPassword) return res.send("user password is required !");
        if(!userConfirmpassword) return res.send("user confirmpassword is required !");
        
        if(userPassword.length <=8)
        {
            return res.send("user password length is less than 8 !");
        }
        if(userConfirmpassword.length <=8)
        {
            return res.send("user confirmpassword length is less than 8 !");
        }
        const response= await User.find({email:userEmail}).exec();

        if(response.length)
        {
            return res.send("Email is already taken or You are already registred");
        }
        
        const user = new User({
            name:userName,
            email:userEmail,
            password:userPassword,
        });
        await user.save();
        return res.send("registration successfull")
    } catch(error)
    {
        return res.send(error)
    }
}

export const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        if (!userEmail) return res.send("User Email is required");
        if (!userPassword) return res.send("User Password is required");
        const response = await User.find({ email: userEmail }).exec();
        if (response.length) {
            if (userPassword === response[0].password) {
                return res.send("you are logged in");
            } else {
                return res.send("Wrong password");
            }
        } else {
            return res.send("User not found check your email..")
        }
    } catch (error) {
        return res.send(error)
    }
}



export const updateUser = async (req,res) =>
{
    try{
        const {email,name} = req.body;
        if(!email ) return res.send("email not found")
        if(!name) return res.send("name not found")
        const response = await User.findOneAndUpdate({email},{name}).exec();
        res.send(response);
    }
    catch(error)
    {
        res.send(error)
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.send("Email not found!")
        const response = await User.find({ email }).exec();
        if (response) {
            return res.send(response[0])
        } else {
            return res.send("User not found!")
        }
    } catch (error) {
        return res.send(error)
    }
}