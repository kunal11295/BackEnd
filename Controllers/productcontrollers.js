export const addproduct = (req,res) => {
   try{
    console.log(req.body)
    
    res.send("hi from addproduct");
} catch(error) {
    console.log(error)
}
}