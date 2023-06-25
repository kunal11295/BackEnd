
import { response } from "express";
import Product from "../model/Product.js";
import User from "../model/User.js";
export const addproduct =async(req,res)  => {

   try{
    console.log(req.body)

    const {Name,Price,Image} =req.body;
    if(!Name) return res.send("name is required");
    if(!Price) return res.send("Price is required");

    const product= new Product({
        name:Name,
        price:Price,
        image:Image
    })

    console.log(product,"check here")
    await product.save()
    return res.send(product);
} catch(error) {
    console.log(error)
}
}




export const getAllProducts = async (req, res) => {
    try{
        const response = await Products.find({}).exec()
        if(response){
            return res.send(response);
        }else{
            return res.send("Products not found!")
        }

    }catch(error){
        return res.send(error);
    }
}


