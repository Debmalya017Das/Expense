import express from 'express';
import cors from 'cors';
import mongoose, { get } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import transactionmodel from './models/transactions.mjs';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.json(`test ok`);    
});
app.post('/api/transactions',async (req,res) =>{
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    const {name,desc,date,price} = req.body;
    const transactionobject = await transactionmodel.create({name,desc,date,price});
    res.json(transactionobject);
});


app.get("/api/transactions", async(req,res) =>{
    await mongoose.connect(process.env.MONGODB_URI);
    const transactions = await transactionmodel.find();
    res.json(transactions);
})
app.listen(5000);


// MZ5A5iveBBO8xN4q