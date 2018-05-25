import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RGL, { WidthProvider } from "react-grid-layout";
import Cell from '../Cell/Cell'
import './dashboard.css';
import _ from 'lodash';

const ReactGridLayout = WidthProvider(RGL);

/*
* Dashboard component, basically a react-grid-layout with dynamic ability to add
* and remove cells.
*/
class Dashboard extends Component {
    static defaultProps = {
        className: 'layout',
        cols: 12,
        rowHeight: 50
    };

    /**
     * Builds and returns elements based on whatever is found in state.cells.
     */
    createCells() {
        const remove = this.props.removeCell;
        const show = this.props.showInfo;
        const edit = this.props.editCell;

        return _.map(this.props.cells, function (cell) {
            const {i, x, y, w, h, minW, minH} = cell.layout;
            return (
                <div key={i} data-grid={{x, y, w, h, minW, minH}}>
                    <Cell 
                        content={cell.content}
                        id={i} 
                        removeCell={remove}
                        showInfo={show}
                        editCell={edit}/>
                </div>
            );
        });
    }

    render() {
        return (
            <ReactGridLayout
                className={this.props.className}
                cols={this.props.cols}
                rowHeight={this.props.rowHeight}
                layout={this.props.layout}
                onLayoutChange={this.props.onLayoutChange}>
                {this.createCells()}
            </ReactGridLayout>
        );
    }
}

Dashboard.propTypes = {
    removeCell: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
    editCell: PropTypes.func.isRequired,
    cells: PropTypes.array.isRequired,
    onLayoutChange: PropTypes.func.isRequired
};

export default Dashboard;




