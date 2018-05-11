const mongoose = require('mongoose');

const graphSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    graphUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Graph', graphSchema);