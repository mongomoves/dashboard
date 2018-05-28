const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Dashboard = require("../models/dashboard");
const LogEntry = require("../models/logentry");
const Widget = require("../models/widget");

/*
 * Handles GET requests to /api/dashboards
 * Returns amount of dashboards and queried dashboards (or all if no query is used)
 */
router.get('/', function(req, res, next) {
    const creator = req.query.creator;
    const limit = req.query.limit;
    const search = req.query.search;

    let query = {};

    // filter by creator
    if (creator) {
        query['creator'] = creator;
    }

    if (search) {
        query['$text'] = {$search: search};
    }

    Dashboard.find(query)
        // populate widget and nested item with associated model
        .populate({
            path: 'widgets.content',
            populate: {path: 'content'}
        })
        .sort({'created': -1}) // sort by date descending (newest first)
        .limit(limit ? Number(limit) : 0) // limit the number of returned dashboards
        .exec()
        .then(dashboards => {
            res.status(200).json({
                count: dashboards.length,
                dashboards: dashboards.map(dashboard => dashboard.toJSON())
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/*
 * Handles POST requests to /api/dashboards
 * Creates a new dashboard
 * Returns a message and the created dashboard
 */
router.post('/', function(req, res, next) {
    const {body} = req;

    // Validate passed in widget ids to make sure they exist
    // We use a set so we don't have to check for duplicates
    let widgetIds = new Set([]);

    for (let i = 0; i < body.widgets.length; i++) {
        const id = body.widgets[i].id;
        widgetIds.add(id);
    }

    Widget.find({_id: Array.from(widgetIds)})
        .then(docs => {
            if (!docs || docs.length !== widgetIds.size) {
                return res.status(500).json({
                    error: {
                        message: "One or more specified widget ids do not exist",
                        specified: Array.from(widgetIds),
                        found: docs.map(doc => doc._id)
                    }
                });
            }

            // Create dashboard model from request body
            const {title, creator, description, widgets} = body;
            const dashboard = new Dashboard({
                _id: new mongoose.Types.ObjectId(),
                title,
                creator,
                description,
                widgets: widgets.map(widget => {
                    return {
                        content: widget.id,
                        layout: {
                            i: widget.i,
                            x: widget.x,
                            y: widget.y,
                            w: widget.w,
                            h: widget.h,
                            minW: widget.minW,
                            minH: widget.minH
                        }
                    }
                })
            });

            dashboard.save()
                .then(result => {

                    res.status(201).json({
                        message: 'Dashboard stored',
                        dashboard: result.toJSON(),
                    });

                    // Create a log entry for the created dashboard
                    const {title, creator, created, _id} = result;
                    const kind = 'Dashboard';

                    const logEntry = new LogEntry({
                        _id: new mongoose.Types.ObjectId(),
                        title,
                        creator,
                        created,
                        kind,
                        text: creator + " skapade en " + kind + " med titel '" + title + "'.",
                        contentId: _id,
                        request: {
                            type: "GET",
                            url: "/api/dashboards/" + _id
                        }
                    }).save();
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

/*
 * Handles GET requests to /api/dashboards/<id>
 * Returns the dashboard with the given id
 */
router.get('/:dashboardId', function(req, res, next) {
    const id = req.params.dashboardId;

    Dashboard.findById(id)
        .populate({
            path: 'widgets.content',
            populate: {path: 'content'}
        })
        .exec()
        .then(dashboard => {
            if (!dashboard) {
                return res.status(404).json({
                    message: "Dashboard not found",
                    id: id
                });
            }

            res.status(200).json({
                dashboard: dashboard.toJSON()
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

/*
 * Handles DELETE requests to /api/dashboardss/<id>
 * Returns a message
 */
router.delete('/:dashboardId', function(req, res, next) {
    const id = req.params.dashboardId;

    Dashboard.findOneAndRemove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Dashboard deleted",
                id: id
            });
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;