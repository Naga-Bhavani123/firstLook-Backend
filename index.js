import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
const app = express();
import cors from 'cors';
app.use(cors());


app.use(express.json());
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


mongoose.connect("mongodb+srv://firstLook:firstLook@cluster0.j6vyjmm.mongodb.net/FirstLookDB").then(() => {
    console.log("Connected to MongoDB");
}
)

app.use("/auth", authRouter); 

export default app;