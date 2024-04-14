import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
const trans = require('./models/transactions.js');

app.use(cors());
app.use(express.json());
// app.use(express.json());
app.get('/', (req,res) => {
    res.json(`test ok`);
});
app.post('/api/transaction',(req,res) =>{
    console.log(process.env.MONGO_URL);
    mongoose.connect('');
    const {name,desc, date} = req.body;
    res.json(req.body);
});
app.listen(5000);


