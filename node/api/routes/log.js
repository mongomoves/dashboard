const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const LogEntry = require("../models/logEntry");

/*
 * Handles GET requests to /api/log
 * Returns amount of log entries and queried entries (or all if no query is used)
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

    LogEntry.find(query)
        .sort({'created': -1}) // sort by date descending (newest first)
        .limit(limit ? Number(limit) : 0) // limit the number of returned entries
        .exec()
        .then(entries => {
            res.status(200).json({
                count: entries.length,
                logEntries: entries
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/*
 * Handles GET requests to /api/log/<id>
 * Returns the log entry with the given id
 */
router.get('/:entryId', function(req, res, next) {
    const id = req.params.entryId;

    LogEntry.findById(id)
        .exec()
        .then(entry => {
            if (!entry) {
                return res.status(404).json({
                    message: "Log entry not found",
                    id: id
                });
            }

            res.status(200).json({
                logEntry: entry
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;