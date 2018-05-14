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
        cols: { lg: 12, md: 10, sm: 8, xs: 2, xxs: 1 },
        rowHeight: 50
    };

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
    };

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange = (breakpoint, cols) => {
        this.props.onBreakpointChange(breakpoint, cols);
    };

    /**
     * Builds and returns elements based on whatever is found in state.cells.
     */
    generateElement() {
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
                {...this.props}>
                {this.generateElement()}
            </ResponsiveGRL>
        );
    }
}

export default Dashboard;




