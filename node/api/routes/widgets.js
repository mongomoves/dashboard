const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Widget = require("../models/widget");
const Value = require("../models/value");
const Graph = require("../models/graph");
const Text = require("../models/text");
const LogEntry = require("../models/logentry");

/*
 * Handles GET requests to /api/widgets
 * Returns amount of widgets and queried widgets (or all if no query is used)
 */
router.get('/', function(req, res, next) {
    const {kind, creator, limit, search} = req.query;

    let query = {};

    // filter by kind
    if (kind) {
        query['kind'] = kind;
    }

    // filter by creator
    if (creator) {
        query['creator'] = creator;
    }

    if (search) {
        query['$text'] = {$search: search};
    }

    Widget.find(query)
        .populate('content')
        .sort({'created': -1}) // sort by date descending (newest first)
        .limit(limit ? Number(limit) : 0) // limit the number of returned widgets
        .exec()
        .then(widgets => {
             res.status(200).json({
                 count: widgets.length,
                 widgets: widgets.map(widget => widget.toJSON())
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
 * Returns a message and the created widget
 */
router.post('/', function(req, res, next) {
    const {body} = req;

    let content;

    // Create the content depening on type of widget
    if (body.kind === 'Value') {
        const {number, dataSource, attribute, unit} = body;

        content = new Value({
            _id: new mongoose.Types.ObjectId(),
            number,
            dataSource,
            attribute,
            unit
        });
    }
    else if (body.kind === 'Graph') {
        const {displayType, graphUrl} = body;

        content = new Graph({
            _id: new mongoose.Types.ObjectId(),
            displayType,
            graphUrl
        });
    }
    else if (body.kind === 'Text') {
        const {textInput, dataSource, attribute} = body;

        content = new Text({
            _id: new mongoose.Types.ObjectId(),
            textInput,
            dataSource,
            attribute
        });
    }
    else {
        return res.status(500).json({
            error: {
                message: "'kind' must be one of the following: Value, Graph, Text"
            }
        });
    }

    // Save content first since we need the id when we create the widget
    content.save()
        .then(result => {
            const {title, creator, description, kind, refreshRate} = body;

            return new Widget({
                _id: new mongoose.Types.ObjectId(),
                title,
                creator,
                description,
                kind,
                refreshRate,
                content: result._id
            });
        })
        .then(widget => {
            widget.save()
                .then(result => {

                    res.status(201).json({
                        message: 'Widget stored',
                        widget: result.toJSON()
                    });

                    // Create a log entry for the widget
                    const {title, creator, created, _id} = result;
                    const kind = 'Widget';

                    new LogEntry({
                        _id: new mongoose.Types.ObjectId(),
                        title,
                        creator,
                        created,
                        kind,
                        text: creator + " skapade en " + kind + " med titel '" + title + "'.",
                        contentId: _id,
                        request: {
                            type: "GET",
                            url: "/api/widgets/" + _id
                        }
                    }).save();
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
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

            res.status(200).json({
                widget: widget.toJSON()
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
            else if (kind === 'Text') {
                Text.remove({_id: id}).catch(err => {
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