import React from 'react';
import {Button, Collapse, Glyphicon, ListGroupItem, Table} from "react-bootstrap";
import _ from "lodash";

const translateKind = {
    Value: "Värde",
    Graph: "Diagram",
    Text: "Text"
};
const translateContent = {
    creator: "Skapare",
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

class SearchCellsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        }
    }

    generateTableData = () => {
        let tableData = [];

        for (let [key, value] of Object.entries(this.props.content)) {
            if (key !== 'title' && key !== 'description' && key !== 'kind' && key !== '_id' && value !== '') {
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
                                {this.generateTableData()}
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

export default SearchCellsListItem;