const mongoose = require('mongoose');

const widgetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    content: {
        kind: {
            type: String,
            required: true,
            enum: ['Value', 'Graph'],
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'content.kind'
        }
    }
});

module.exports = mongoose.model('Widget', widgetSchema);