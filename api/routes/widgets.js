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
        query['kind'] = kind;
    }

    // filter by creator
    if (creator) {
        query['creator'] = creator;
    }

    Widget.find(query)
        .populate('content')
        .sort({'created': -1}) // sort by date descending (newest first)
        .limit(limit ? Number(limit) : 0) // limit the number of returned widgets
        .exec()
        .then(widgets => {
             res.status(200).json({
                count: widgets.length,
                 // Instead of sending back the document we flatten the respone
                 // Makes the api easier to use, but adds a bit more work
                widgets: widgets.map(widget => {
                    return {
                        _id: widget._id,
                        title: widget.title,
                        creator: widget.creator,
                        created: widget.created,
                        description: widget.description,
                        kind: widget.kind,

                        number: widget.content.number,
                        dataSource: widget.content.dataSource,
                        attribute: widget.content.attribute,
                        query: widget.content.query,
                        unit: widget.content.unit,

                        graphUrl: widget.content.graphUrl
                    }
                })
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
 * Returns a message and created widget
 */
router.post('/', function(req, res, next) {
    const kind = req.body.kind;

    let content;

    if (kind === 'Value') {
        content = new Value({
            _id: new mongoose.Types.ObjectId(),
            number: req.body.number,
            dataSource: req.body.dataSource,
            attribute: req.body.attribute,
            query: req.body.query,
            unit: req.body.unit
        });
    }
    else if (kind === 'Graph') {
        content = new Graph({
            _id: new mongoose.Types.ObjectId(),
            graphUrl: req.body.graphUrl
        });
    }
    else {
        return res.status(500).json({
            error: {
                message: "'kind' must be one of the following: Value, Graph"
            }
        });
    }

    content.save()
        .then(result => {
            const widget = new Widget({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                creator: req.body.creator,
                description: req.body.description,
                kind: kind,
                content: result._id
            });

            widget.save()
                .then(result => {
                    const {title, creator, _id, created} = result;
                    const logKind = 'Widget';

                    const logEntry = new LogEntry({
                        _id: new mongoose.Types.ObjectId(),
                        title: title,
                        creator: creator,
                        created: created,
                        kind: logKind,
                        text: creator + " created a " + logKind + " titled '" + title + "'.",
                        contentId: _id,
                        request: {
                            type: "GET",
                            url: process.env.SERVER_URL + "/api/widgets/" + _id
                        }
                    });

                    logEntry.save()
                        .catch(err => {
                            console.log(err);
                        });

                    res.status(201).json({
                        message: 'Widget stored',
                        widget: widget,
                    });

                })
                .catch(err =>  {
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


});

/*
 * Handles GET requests to /api/widgets/<id>
 * Returns the widget with the given id
 */
router.get('/:widgetId', function(req, res, next) {
    const id = req.params.widgetId;

    Widget.findById(id)
        .populate('content')
        .exec()
        .then(widget => {
            if (!widget) {
                return res.status(404).json({
                    message: "Widget not found",
                    id: id
                });
            }

            // Instead of sending back the document we flatten the respone
            // Makes the api easier to use, but adds a bit more work
            res.status(200).json({
                widget: {
                    _id: widget._id,
                    title: widget.title,
                    creator: widget.creator,
                    created: widget.created,
                    description: widget.description,
                    kind: widget.kind,

                    number: widget.content.number,
                    dataSource: widget.content.dataSource,
                    attribute: widget.content.attribute,
                    query: widget.content.query,
                    unit: widget.content.unit,

                    graphUrl: widget.content.graphUrl
                }
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
            const kind = result.kind;
            const id = new mongoose.Types.ObjectId(result.content);

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
                message: "Widget deleted",
                id: widgetId
            });
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;