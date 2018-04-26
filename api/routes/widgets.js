const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Value = require("../models/value");
const Widget = require("../models/widget");

router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Handling GET requests to /widgets'
    });
});

router.post('/', function(req, res, next) {
    const kind = req.body.content.kind;

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
    // else if (req.body.content.kind === 'Graph') ... do stuff

    content
        .save()
        .then(result => {
            console.log(result);

            const widget = new Widget({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                content: {
                    kind: kind,
                    type: result._id
                }
            });

            widget
                .save()
                .then(result => {
                    console.log(result);

                    res.status(201).json({
                        message: 'Handling POST requests to /widgets',
                        createdEntry: widget
                    })
                })
                .catch(err => {
                    console.log(err);

                    res.status(500).json({
                        error: err
                    })
                });
        })
        .catch(err =>  {
            console.log(err);

            res.status(500).json({
                error: err
            });
        });
});

router.get('/:widgetId', function(req, res, next) {
    const id = req.params.valueId;

    Value.findById(id)
        .exec()
        .then(doc => {
            console.log("From mongoDB", doc);

            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: "No valid entry found for ID " + id,
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;