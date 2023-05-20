import  express  from "express";
import morgan from "morgan";
import { anu, kunal, naval, vrushab } from "./Controllers/All controllers.js";
import router from './routes/Userroutes.js'
const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1',router);
app.get('/kunal',kunal);
app.get('/anu', anu);
// app.get('/naval', naval);
// app.get('/vrushab',vrushab);
app.listen(8000,() => console.log("working on port 8000"));