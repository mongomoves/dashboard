const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Widget = require("../models/widget");
const Value = require("../models/value");
const Graph = require("../models/graph");

/*
 * Handles GET requests to /api/widgets
 * Returns all widgets
 */
router.get('/', function(req, res, next) {
    Widget.find()
        .populate('content.item')
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
 * Returns created widget and associated log entry
 */
router.post('/', function(req, res, next) {
    const kind = req.body.content.kind;

    // Create the content model based on the kind (value or graph)
    let content;

    if (kind === 'value') {
        content = new Value({
            _id: new mongoose.Types.ObjectId(),
            number: req.body.content.number,
            api: req.body.content.api,
            attribute: req.body.content.attribute,
            unit: req.body.content.unit
        });
    }
    else if (kind === 'graph') {
        content = new Graph({
            _id: new mongoose.Types.ObjectId(),
            url: req.body.content.url
        })
    }

    // Save the content first because we need the id when we create the widget model.
    content.save()
        .then(result => {
            const widget = new Widget({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                content: {
                    kind: kind,
                    item: result._id
                }
            });

            widget
                .save()
                .then(result => {
                    res.status(201).json({
                        message: 'Widget stored',
                        widget: widget
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
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

module.exports = router;