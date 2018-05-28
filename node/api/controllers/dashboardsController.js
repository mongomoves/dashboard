const mongoose = require('mongoose');
const Dashboard = require("../models/dashboard");
const LogEntry = require("../models/logEntry");
const Widget = require("../models/widget");

/**
 * Returns all or queried dashboards
 */
exports.dashboards_get_all = (req, res, next) => {
    Dashboard.find(handleQuery(req.query))
        .populate({
            path: 'widgets.content',
            populate: {path: 'content'}
        })
        .sort({'created': -1}) // sort by date descending (newest first)
        .limit(req.query.limit ? Number(req.query.limit) : 0) // limit the number of returned dashboards
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
};

/**
 * Creates a new dashboard
 * Returns a message and the created dashboard
 */
exports.dashboards_create_dashboard = (req, res, next) => {
    const body = req.body;

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

                    createLogEntry(result);

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
};

/**
 * Returns the dashboard with the given id
 */
exports.dashboards_get_dashboard = (req, res, next) => {
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
};

/*
 * Returns a message and the id of the deleted dashboard
 */
exports.dashboards_delete_dashboard = (req, res, next) => {
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
};

/**
 * Handles query parameters
 * @param query the request query
 * @returns {Object} object with query parameters
 */
function handleQuery(query) {
    const {creator, search} = query;

    let queryAsObject = {};

    // filter by creator
    if (creator) {
        queryAsObject['creator'] = creator;
    }

    // filter by full text search
    if (search) {
        queryAsObject['$text'] = {$search: search};
    }

    return queryAsObject;
}

/**
 * Creates a log entry for the created dashboard
 * @param dashboard the created dashboard
 */
function createLogEntry(dashboard) {
    const {title, creator, created, _id} = dashboard;
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
    }).save().catch(err => {console.log(err)});
}