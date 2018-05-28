import React from 'react';
import PropTypes from 'prop-types';
import {Button, Collapse, Glyphicon, ListGroupItem, Table} from "react-bootstrap";
import _ from "lodash";

const translateKind = {
    Value: "Värde",
    Graph: "Diagram",
    Text: "Text"
};

const translateContent = {
    creator: "Skapad av",
    created: "Skapad",
    number: "Värde",
    textInput: "Fritext",
    graphUrl: "Diagram-Url",
    refreshRate: "Uppd.frekvens",
    displayType: "Visningstyp",
    unit: "Enhet",
    dataSource: "Datakälla",
    attribute: "Attribut"
};

/**
 * Represents a single list item in SearchCellsList.
 */
class SearchCellsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        }
    }

    /**
     * Uses props.content to populate a table with data.
     * Left column is the content key (translated)
     * Right column is the content value.
     * @returns {Array} array of <tr>-elements
     */
    generateTableContent = () => {
        let tableContent = [];

        // Not all the properties in props.content should be shown in the table, we pick the ones we need.
        let tableProperties = _.pick(this.props.content, Object.keys(translateContent));

        if (tableProperties['refreshRate'] === 0) {
            delete tableProperties['refreshRate'];
        }

        for (let [key, value] of Object.entries(tableProperties)) {
            if (value !== '') {
                tableContent.push({
                    key: key,
                    value: value
                });
            }
        }

        return _.map(tableContent, function (property) {
            let value = property.value;
            let key = property.key;

            if (key === 'created') {
                // Only show date
                value = value.split('T')[0];
            }
            else if (key === 'refreshRate') {
                value = value + " min";
            }

            return (
                <tr key={key}>
                    <td>{translateContent[key]}:</td>
                    <td>{value}</td>
                </tr>
            );
        });
    };

    render() {
        return(
            <div>
                <ListGroupItem>
                    <div>
                        <span><strong>{this.props.content.title}</strong></span>
                        <span className="pull-right text-muted" >
                            {translateKind[this.props.content.kind]}
                        </span>
                    </div>

                    <div style={{marginBottom: "1em"}}>
                        {this.props.content.description}
                    </div>
                    <Collapse in={this.state.collapse}>
                        <Table responsive condensed style={{width: "auto"}}>
                            <tbody>
                                {this.generateTableContent()}
                            </tbody>
                        </Table>
                    </Collapse>
                    <div>
                        <Button
                            bsSize="small"
                            onClick={() => this.props.addCell(this.props.content)}>
                            Lägg till på din Dashboard
                        </Button>
                        <Button
                            className="pull-right"
                            bsSize="small"
                            bsStyle="link"
                            onClick={() => this.setState({collapse: !this.state.collapse})}>
                            <Glyphicon glyph={this.state.collapse ? "chevron-up" : "chevron-down"}/>
                        </Button>
                    </div>
                </ListGroupItem>
            </div>
        );
    }
}

SearchCellsListItem.propTypes = {
    addCell: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired
};

export default SearchCellsListItem;