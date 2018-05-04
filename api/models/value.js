const mongoose = require('mongoose');

const valueSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: {
        type: Number,
        required: [
            function() {return this.dataSource == null},
            'number or dataSource is required'
        ]
    },
    dataSource: {
        type: String,
        required: [
            function() {return this.number == null},
            'number or dataSource is required'
        ]
    },
    attribute: {
        type: String,
        required: [
            function() {return this.dataSource != null},
            'attribute is required if dataSource is specified'
        ]
    },
    query: String,
    unit: String
});

module.exports = mongoose.model('Value', valueSchema);