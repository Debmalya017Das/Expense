import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transactionmodel from './models/transactions.mjs';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error.message));

// Routes
app.get('/', (req, res) => {
    res.json('test ok');
});

app.post('/api/transactions', async (req, res) => {
    try {
        const { name, desc, date, price } = req.body;
        const transactionobject = await transactionmodel.create({ name, desc, date, price });
        res.json(transactionobject);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add transaction' });
    }
});

app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await transactionmodel.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
