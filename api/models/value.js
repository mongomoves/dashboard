const mongoose = require('mongoose');

const valueSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: Number,
    api: String,
    attribute: String,
    unit: String
});

module.exports = mongoose.model('Value', valueSchema);