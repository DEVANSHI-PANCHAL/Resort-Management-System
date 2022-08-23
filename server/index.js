import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from "./routes/user.js";
import resortRouter from "./routes/resort.js";
import gameRouter from "./routes/game.js";
import 'dotenv/config';

const app = express();
// const multer  = require('multer')

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use("/users", userRouter);
app.use('/resort', resortRouter);
app.use('/game', gameRouter);


const PORT = process.env.PORT|| 5003;
const uri = "mongodb+srv://root:root@cluster0.f6y4bgx.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri)
  .then(() =>{
    console.log('MongoDB Connected.')
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))})
  .catch((error) => console.log(`${error} did not connect`));
