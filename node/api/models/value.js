const mongoose = require('mongoose');

const valueSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: {
        type: Number,
        required: [
            function() {return this.dataSource == null && this.dataSource === ""},
            'number or dataSource is required'
        ]
    },
    dataSource: {
        type: String,
        required: [
            function() {return this.number == null && this.number === ""},
            'number or dataSource is required'
        ]
    },
    attribute: {
        type: String,
        required: [
            function() {return this.dataSource != null && this.dataSource !== ""},
            'attribute is required if dataSource is specified'
        ]
    },
    unit: String
});

module.exports = mongoose.model('Value', valueSchema);