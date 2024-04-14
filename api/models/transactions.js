const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Transactionschema = new Schema({

    name: {type: String, required: true},
    desc: {type: String, required:true},
    date: {type: Date, required: true},
});

const transactionmodel = model('transaction', Transactionschema);

module.exports = transactionmodel;