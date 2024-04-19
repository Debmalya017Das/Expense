import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const Transactionschema = new Schema({

    name: {type: String, required: true},
    price: {type: Number, required: true},
    desc: {type: String, required:true},
    date: {type: Date, required: true},
});

const transactionmodel = model('transactions', Transactionschema);

export default transactionmodel;