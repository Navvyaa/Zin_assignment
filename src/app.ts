import express, {Application} from "express"
import authRoutes from "./routes/authRoute"
import userRoutes from "./routes/userRoutes"
const app:Application=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.use('/api/auth',authRoutes);
app.use('/api/users/',userRoutes);


export default app;