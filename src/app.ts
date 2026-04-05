import express, {Application} from "express"
import authRoutes from "./routes/auth.route"
const app:Application=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.use('/api/auth',authRoutes)
export default app;