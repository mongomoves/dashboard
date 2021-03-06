const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    textInput: {
        type: String,
        required: [
            function() {return this.dataSource == null && this.dataSource === ""},
            'text or dataSource is required'
        ]
    },
    dataSource: {
        type: String,
        required: [
            function() {return this.textInput == null && this.textInput === ""},
            'text or dataSource is required'
        ]
    },
    attribute: {
        type: String,
        required: [
            function() {return this.dataSource != null && this.dataSource !== ""},
            'attribute is required if dataSource is specified'
        ]
    },
});

module.exports = mongoose.model('Text', textSchema);