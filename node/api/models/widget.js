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

widgetSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        title: this.title,
        creator: this.creator,
        created: this.created,
        description: this.description,
        kind: this.kind,
        refreshRate: this.refreshRate,

        number: this.content.number,
        textInput: this.content.textInput,
        dataSource: this.content.dataSource,
        attribute: this.content.attribute,
        query: this.content.query,
        unit: this.content.unit,

        displayType: this.content.displayType,
        graphUrl: this.content.graphUrl
    }
};

module.exports = mongoose.model('Widget', widgetSchema);