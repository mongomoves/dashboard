const mongoose = require('mongoose');

const graphSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    diplayType: {
        type: String,
        required: true,
        enum: ['Iframe', 'Img']
    },
    graphUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Graph', graphSchema);