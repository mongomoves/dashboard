const mongoose = require('mongoose');

const logEntrySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true,
        enum: ["Widget", "Dashboard"]
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    request: {
        type: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('LogEntry', logEntrySchema);