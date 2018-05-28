const mongoose = require('mongoose');
const LogEntry = require("../models/logEntry");

/**
 * Returns all or queried log entries
 */
exports.getAll = (req, res, next) => {
    LogEntry.find(handleQuery(req.query))
        .sort({'created': -1}) // sort by date descending (newest first)
        .limit(req.query.limit ? Number(req.query.limit) : 0) // limit the number of returned entries
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
};

/**
 * Returns the log entry with the given id
 */
exports.getEntry = (req, res, next) => {
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
};

/**
 * Handles query parameters
 * @param query the request query
 * @returns {Object} object with query parameters
 */
function handleQuery(query) {
    const {kind, creator} = query;

    let queryAsObject = {};

    // filter by kind
    if (kind) {
        queryAsObject['kind'] = kind;
    }

    // filter by creator
    if (creator) {
        queryAsObject['creator'] = creator;
    }

    return queryAsObject;
}