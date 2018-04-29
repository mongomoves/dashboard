const mongoose = require('mongoose');

const dashboardSchema = mongoose.Schema({
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
    widgets: [
        {
            widget: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Widget"
            },
            pos: {
                x: Number,
                y: Number,
                w: Number,
                h: Number
            }
        }
    ]
});

module.exports = mongoose.model('Dashboard', dashboardSchema);