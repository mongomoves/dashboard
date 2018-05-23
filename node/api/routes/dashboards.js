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
                // Instead of sending back the document we flatten the response
                // Makes the api easier to use, but adds a bit more work
                dashboards: dashboards.map(dashboard => {
                    return {
                        _id: dashboard._id,
                        title: dashboard.title,
                        creator: dashboard.creator,
                        created: dashboard.created,
                        description: dashboard.description,
                        widgets: dashboard.widgets.map(widget => {
                            return {
                                layout: widget.layout,
                                content: {
                                    _id: widget.content._id,
                                    title: widget.content.title,
                                    creator: widget.content.creator,
                                    created: widget.content.created,
                                    description: widget.content.description,
                                    kind: widget.content.kind,
                                    refreshRate: widget.content.refreshRate,

                                    number: widget.content.content.number,
                                    textInput: widget.content.content.textInput,
                                    dataSource: widget.content.content.dataSource,
                                    attribute: widget.content.content.attribute,
                                    query: widget.content.content.query,
                                    unit: widget.content.content.unit,

                                    graphUrl: widget.content.content.graphUrl,
                                    displayType: widget.content.content.displayType
                                }
                            }
                        })
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
 * Handles POST requests to /api/dashboards
 * Creates a new dashboard
 * Returns a message and the created dashboard
 */
router.post('/', function(req, res, next) {
    // Validate passed in widget ids to make sure they exist
    // We use a set so we don't have to check for duplicates
    // The way this is implemented allows us to save the same widget
    // in a dashboard at different positions. Easier when developing.
    let widgetIds = new Set([]);

    for (let i = 0; i < req.body.widgets.length; i++) {
        const id = req.body.widgets[i].id;
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
            const dashboard = new Dashboard({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                creator: req.body.creator,
                description: req.body.description,
                widgets: req.body.widgets.map(widget => {
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
                    const {title, creator, _id, created} = result;
                    const logKind = 'Dashboard';

                    const logEntry = new LogEntry({
                        _id: new mongoose.Types.ObjectId(),
                        title: title,
                        creator: creator,
                        created: created,
                        kind: logKind,
                        text: creator + " skapade en " + logKind + " med titel '" + title + "'.",
                        contentId: _id,
                        request: {
                            type: "GET",
                            url: process.env.SERVER_URL + "/api/dashboards/" + _id
                        }
                    });

                    logEntry.save()
                        .catch(err => {
                            console.log(err);
                        });

                    res.status(201).json({
                        message: 'Dashboard stored',
                        dashboard: dashboard,
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });

        }).catch(err => {
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
                // Instead of sending back the document we flatten the response
                // Makes the api easier to use, but adds a bit more work
                dashboard: {
                    _id: dashboard._id,
                    title: dashboard.title,
                    creator: dashboard.creator,
                    created: dashboard.created,
                    description: dashboard.description,
                    widgets: dashboard.widgets.map(widget => {
                        return {
                            layout: widget.layout,
                            content: {
                                _id: widget.content._id,
                                title: widget.content.title,
                                creator: widget.content.creator,
                                created: widget.content.created,
                                description: widget.content.description,
                                kind: widget.content.kind,
                                refreshRate: widget.content.refreshRate,

                                number: widget.content.content.number,
                                textInput: widget.content.content.textInput,
                                dataSource: widget.content.content.dataSource,
                                attribute: widget.content.content.attribute,
                                query: widget.content.content.query,
                                unit: widget.content.content.unit,

                                graphUrl: widget.content.content.graphUrl,
                                displayType: widget.content.content.displayType
                            }
                        }
                    })
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