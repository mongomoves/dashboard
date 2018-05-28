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
            content: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Widget"
            },
            layout: {
                i: {
                    type: String,
                    required: true
                },
                x: {
                    type: Number,
                    required: true
                },
                y: {
                    type: Number,
                    required: true
                },
                w: {
                    type: Number,
                    required: true
                },
                h: {
                    type: Number,
                    required: true
                },
                minW: {
                    type: Number,
                    required: true
                },
                minH: {
                    type: Number,
                    required: true
                }
            }
        }
    ]
});
dashboardSchema.index({title: 'text', description: 'text', creator: 'text'});

dashboardSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        title: this.title,
        creator: this.creator,
        created: this.created,
        description: this.description,
        widgets: this.widgets.map(widget => {
            return {
                layout: widget.layout,
                content: widget.content.toJSON()
            }
        })
    }
};

module.exports = mongoose.model('Dashboard', dashboardSchema);