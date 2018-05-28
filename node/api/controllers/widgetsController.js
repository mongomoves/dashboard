const mongoose = require('mongoose');
const Widget = require("../models/widget");
const Value = require("../models/value");
const Graph = require("../models/graph");
const Text = require("../models/text");
const LogEntry = require("../models/logEntry");

/**
 * Returns all or queried widgets
 */
exports.getAll = (req, res, next) => {
    Widget.find(handleQuery(req.query))
        .populate('content')
        .sort({'created': -1}) // sort by date descending (newest first)
        .limit(req.query.limit ? Number(req.query.limit) : 0) // limit the number of returned widgets
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
};

/**
 * Creates a new widget
 * Returns a message and the created widget
 */
exports.createWidget = (req, res, next) => {
    const body = req.body;

    const content = createWidgetContent(body);

    if (!content) {
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

                    createLogEntry(result);

                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
};

/**
 * Returns the widget with the given id
 */
exports.getWidget = (req, res, next) => {
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
};

/**
 * Deletes a widget and its content
 * Returns a message and id of deleted widget
 */
exports.deleteWidget = (req, res, next) => {
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
};

/**
 * Creates widget content based on widget kind
 * @param body the request body
 * @returns {Value, Graph, Text} content model based on widget kind
 */
function createWidgetContent(body) {
    let content = null;

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

    return content;
}

/**
 * Handles query parameters
 * @param query the request query
 * @returns {Object} object with query parameters
 */
function handleQuery(query) {
    const {kind, creator, search} = query;

    let queryAsObject = {};

    // filter by kind
    if (kind) {
        queryAsObject['kind'] = kind;
    }

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
 * Creates a log entry for the created widget
 * @param widget the created widget
 */
function createLogEntry(widget) {
    const {title, creator, created, _id} = widget;
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
    }).save().catch(err => {console.log(err)});
}