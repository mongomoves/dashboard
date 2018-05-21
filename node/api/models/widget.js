const mongoose = require('mongoose');

/**
 * Represents a widget in mongoDB
 */
const widgetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    creator: {
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
    kind: {
        type: String,
        required: true,
        enum: ['Value', 'Graph', 'Text']
    },
    refreshRate: {
        type: Number
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'kind',
        required: true
    }
});
widgetSchema.index({title: 'text', description: 'text', creator: 'text'});

module.exports = mongoose.model('Widget', widgetSchema);