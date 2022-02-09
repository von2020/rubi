const mongoose = require('mongoose');

const depositSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    amount: Number,
    // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Deposit', depositSchema);
