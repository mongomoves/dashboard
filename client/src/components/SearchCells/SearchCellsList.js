import React from 'react';
import {ListGroup} from "react-bootstrap";
import SearchCellsListItem from "./SearchCellsListItem";
import _ from 'lodash';

class SearchCellsList extends React.Component {

    createListItems = () => {
        const addCell = this.props.addCell;

        return _.map(this.props.cells, function (cell) {
            return (
                <SearchCellsListItem key={cell._id} addCell={addCell} content={cell}/>
            );
        });
    };

    render() {
        return (
            <ListGroup>
                {this.createListItems()}
            </ListGroup>
        );
    }
}

export default SearchCellsList;