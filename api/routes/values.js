const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Value = require("../models/value");

router.post('/', function(req, res, next) {
    const value = new Value({
        _id: new mongoose.Types.ObjectId(),
        number: req.body.number,
        api: req.body.api,
        attribute: req.body.attribute,
        unit: req.body.unit
    });

    value
        .save()
        .then(result => {
            console.log(result);

            res.status(201).json({
                message: 'Handling POST requests to /values',
                createdEntry: value
            });
        })
        .catch(err =>  {
            console.log(err);

            res.status(500).json({
                error: err
            })
        });
});

router.get('/:valueId', function(req, res, next) {
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