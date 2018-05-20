import React from 'react';
import {Button, Collapse, Glyphicon, ListGroupItem, Table} from "react-bootstrap";

const translateKind = {Value: "Värde", Graph: "Diagram", Text: "Text"};

class SearchCellsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        }
    }

    //TODO: another way of rendering cell content, refreshRate causes a bug since 0 is false
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
                                <tr>
                                    <td>Skapare:</td>
                                    <td>{this.props.content.creator}</td>
                                </tr>
                                {this.props.content.number &&
                                <tr>
                                    <td>Värde:</td>
                                    <td>{this.props.content.number}</td>
                                </tr>}
                                {this.props.content.text &&
                                <tr>
                                    <td>Fritext:</td>
                                    <td>{this.props.content.text}</td>
                                </tr>}
                                {this.props.content.dataSource &&
                                <tr>
                                    <td>Datakälla:</td>
                                    <td>{this.props.content.dataSource}</td>
                                </tr>}
                                {this.props.content.attribute &&
                                <tr>
                                    <td>Data-attribut:</td>
                                    <td>{this.props.content.attribute}</td>
                                </tr>}
                                {this.props.content.unit &&
                                <tr>
                                    <td>Enhet:</td>
                                    <td>{this.props.content.unit}</td>
                                </tr>}
                                {this.props.content.graphUrl &&
                                <tr>
                                    <td>Diagram-URL:</td>
                                    <td>{this.props.content.graphUrl}</td>
                                </tr>}
                                {this.props.content.displayType &&
                                <tr>
                                    <td>Visningstyp:</td>
                                    <td>{this.props.content.displayType}</td>
                                </tr>}
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