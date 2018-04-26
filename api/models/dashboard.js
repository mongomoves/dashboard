const mongoose = require('mongoose');

const dashboardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    description: String,
    widgets: [
        {
            type: ObjectId,
            ref: "Widget",
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