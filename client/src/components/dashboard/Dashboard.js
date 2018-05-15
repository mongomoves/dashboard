import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Cell from '../cell/Cell'
import './dashboard.css';
import _ from 'lodash';

const ResponsiveGRL = WidthProvider(Responsive);

/*
* Dashboard component, basically a react-grid-layout with dynamic ability to add
* and remove cells.
*/
class Dashboard extends Component {
    static defaultProps = {
        className: 'layout',
        cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
        rowHeight: 50
    };

    constructor(props) {
        super(props);
    }

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
            <ResponsiveGRL
                className={this.props.className}
                cols={this.props.cols}
                rowHeight={this.props.rowHeight}
                layouts={this.props.layouts}
                onLayoutChange={(layout, layouts) => this.props.onLayoutChange(layout, layouts)}
                onBreakpointChange={(breakpoint, cols) => this.props.onBreakpointChange(breakpoint, cols)}>
                {this.createCells()}
            </ResponsiveGRL>
        );
    }
}

export default Dashboard;




