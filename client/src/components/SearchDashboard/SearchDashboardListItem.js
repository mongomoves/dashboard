import React from 'react';
import PropTypes from 'prop-types';
import {Button, Collapse, Glyphicon, ListGroupItem, Table} from "react-bootstrap";
import _ from "lodash";

const translateContent = {
    creator: "Skapare",
    created: "Skapad",
};

class SearchDashboardListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        }
    }

    generateTableData = () => {
        let tableData = [];

        for (let [key, value] of Object.entries(this.props.content)) {
            if (key !== 'title' && key !== 'description' && key !== '_id' && key !== 'widgets') {
                tableData.push({key: key, value: value});
            }
        }
        return _.map(tableData, function (property) {
            let value = property.value;
            let key = translateContent[property.key];

            if (property.key === 'created') {
                value = value.split('T')[0];
            }
            else if (property.key === 'refreshRate') {
                value = value + " min";
            }

            return (
                <tr key={property.key}>
                    <td>{key}:</td>
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
                    </div>

                    <div style={{marginBottom: "1em"}}>
                        {this.props.content.description}
                    </div>
                    <Collapse in={this.state.collapse}>
                        <Table responsive condensed style={{width: "auto"}}>
                            <tbody>
                            {this.generateTableData()}
                            </tbody>
                        </Table>
                    </Collapse>
                    <div>
                        <Button
                            bsSize="small"
                            onClick={() => this.props.addDashboard(this.props.content.widgets)}>
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

SearchDashboardListItem.propTypes = {
    addDashboard: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired
};

export default SearchDashboardListItem;