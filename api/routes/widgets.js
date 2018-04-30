const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Widget = require("../models/widget");
const Value = require("../models/value");
const Graph = require("../models/graph");
const LogEntry = require("../models/logentry");

/*
 * Handles GET requests to /api/widgets
 * Returns amount of widgets and queried widgets (or all if no query is used)
 */
router.get('/', function(req, res, next) {
    const kind = req.query.kind;
    const creator = req.query.creator;
    const limit = req.query.limit;

    let query = {};

    // filter by kind
    if (kind) {
        query['content.kind'] = kind;
    }

    // filter by creator
    if (creator) {
        query['creator'] = creator;
    }

    Widget.find(query)
        .populate('content.item') // populate item with associated model
        .sort({'created': -1}) // sort by date descending (newest first)
        .limit(limit ? Number(limit) : 0) // limit the number of returned widgets
        .exec()
        .then(widgets => {
             res.status(200).json({
                count: widgets.length,
                widgets: widgets
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/*
 * Handles POST requests to /api/widgets
 * Creates a new widget
 * Returns a message, created widget and associated log entry
 */
router.post('/', function(req, res, next) {
    const kind = req.body.content.kind;

    // Create the content model based on the kind (value or graph)
    let content;

    if (kind === 'Value') {
        content = new Value({
            _id: new mongoose.Types.ObjectId(),
            number: req.body.content.number,
            api: req.body.content.api,
            attribute: req.body.content.attribute,
            unit: req.body.content.unit
        });
    }
    else if (kind === 'Graph') {
        content = new Graph({
            _id: new mongoose.Types.ObjectId(),
            url: req.body.content.url
        });
    }
    else {
        return res.status(500).json({
            error: {
                message: "'kind' must be one of the following: Value, Graph"
            }
        });
    }

    // Save the content first because we need the id when we create the widget model.
    content.save()
        .then(result => {
            const widget = new Widget({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                creator: req.body.creator,
                description: req.body.description,
                content: {
                    kind: kind,
                    item: result._id
                }
            });

            widget.save()
                .then(result => {
                    const logEntry = new LogEntry({
                        _id: new mongoose.Types.ObjectId(),
                        creator: widget.creator,
                        text: widget.creator + " created a widget titled '" + widget.title + "'.",
                        kind: 'Widget',
                        contentId: widget._id,
                        request: {
                            type: "GET",
                            url: process.env.SERVER_URL + "/api/widgets/" + widget._id
                        }
                    });

                    logEntry.save()
                        .then(result => {
                            res.status(201).json({
                                message: 'Widget stored',
                                widget: widget,
                                logEntry: logEntry
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err =>  {
            res.status(500).json({
                error: err
            });
        });
});

/*
 * Handles GET requests to /api/widgets/<id>
 * Returns the widget with the given id
 */
router.get('/:widgetId', function(req, res, next) {
    const id = req.params.widgetId;

    Widget.findById(id)
        .populate('content.item')
        .exec()
        .then(widget => {
            if (!widget) {
                return res.status(404).json({
                    message: "Widget not found",
                    id: id
                });
            }

            res.status(200).json({
                widget: widget
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/*
 * Handles DELETE requests to /api/widgets/<id>
 * Returns a message
 */
router.delete('/:widgetId', function(req, res, next) {
    const widgetId = req.params.widgetId;

    Widget.findOneAndRemove({_id: req.params.widgetId})
        .exec()
        .then(result => {
            const kind = result.content.kind;
            const id = new mongoose.Types.ObjectId(result.content.item);

            // Also remove documents for dynamic references
            if (kind === 'Value') {
                Value.remove({_id: id}).catch(err => {
                    console.log(err);
                });
            }
            else if (kind === 'Graph') {
                Graph.remove({_id: id}).catch(err => {
                    console.log(err);
                });
            }

            res.status(200).json({
                message: "Widget deleted"
            });
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;