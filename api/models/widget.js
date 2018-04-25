const mongoose = require('mongoose');

const widgetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    creator: String,
    created: {
        type: Date,
        default: Date.now
    },
    description: String,
    content: {
        kind: String,
        item: {
            type: ObjectId,
            refPath: 'content.kind'
        }
    }
});

module.exports = mongoose.model('Widget', widgetSchema);