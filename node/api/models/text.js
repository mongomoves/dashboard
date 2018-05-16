const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        required: [
            function() {return this.dataSource == null},
            'text or dataSource is required'
        ]
    },
    dataSource: {
        type: String,
        required: [
            function() {return this.text == null},
            'text or dataSource is required'
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
});

module.exports = mongoose.model('Text', textSchema);