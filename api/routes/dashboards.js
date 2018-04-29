const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Dashboard = require("../models/dashboard");

//TODO: Might be overkill to populate with widget references, think about just using widget ids instead

/*
 * Handles GET requests to /api/dashboards
 * Returns number of dashboards and all dashboards
 */
router.get('/', function(req, res, next) {
    Dashboard.find()
        .populate('widgets.widget')
        .exec()
        .then(dashboards => {
            res.status(200).json({
                count: dashboards.length,
                dashboards: dashboards
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
 * Returns created dashboard and associated log entry
 */
router.post('/', function(req, res, next) {
    const dashboard = new Dashboard({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        creator: req.body.creator,
        description: req.body.description,
        widgets: req.body.widgets
    });

    dashboard.save()
        .then(result => {
            res.status(201).json({
                message: 'Dashboard stored',
                dashboard: dashboard
            })
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
        .populate('widget')
        .exec()
        .then(dashboard => {
            if (!dashboard) {
                return res.status(404).json({
                    message: "Dashboard not found",
                    id: id
                });
            }

            res.status(200).json({
                dashboard: dashboard
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
                message: "Dashboard deleted"
            });
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;