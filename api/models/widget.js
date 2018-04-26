const mongoose = require('mongoose');

const widgetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    created: {
        type: Date,
        default: Date.now
    },
    description: String,
    content: {
        kind: String,
        item: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'content.kind'
        }
    }
});

module.exports = mongoose.model('Widget', widgetSchema);