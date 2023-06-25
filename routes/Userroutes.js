import  express  from "express";
import { getUserByEmail, login, register, updateUser} from "../Controllers/usercontrollers.js";
import {addproduct, getAllProducts} from "../Controllers/productcontrollers.js";
import { checkEmail, checkName} from "../middleware/authmiddleware.js";
import { AddProduct, RemoveProduct,loginOtpCheckForEmail,loginOtpCheckForNumber,otpCheckForEmail, otpCheckForNumber,otpLogin,otpRegistration} from "../Controllers/Otpcontrollers.js";


const router = express.Router();

router.post('/login',login)
router.post('/addproduct',addproduct)
router.post('/register',register)


router.post('/update-User',checkEmail,checkName,updateUser)
router.post('/getUserByEmail',getUserByEmail)


router.post('/otp-register',otpRegistration)
router.post('/otp-Check-Number',otpCheckForNumber)
router.post('/otp-Check-Email',otpCheckForEmail)


router.post('/otp-login', otpLogin)
router.post('/login-otp-Check-Email',loginOtpCheckForEmail)
router.post('/login-otp-Check-Number',loginOtpCheckForNumber)

router.post('/add-Product',AddProduct)
router.post('/remove-product',RemoveProduct)



router.get('/get-all-products',getAllProducts)









export default router;