import  express  from "express";
import { login, register } from "../Controllers/usercontrollers.js";
import {addproduct} from "../Controllers/productcontrollers.js";

const router=express.Router();

router.get('/login',login)
router.get('/register',register)
router.post('/addproduct',addproduct)
export default router;