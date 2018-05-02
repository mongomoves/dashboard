import React, { Component } from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import _ from 'lodash';
import {Jumbotron, Button} from 'react-bootstrap';




const ResponsiveGRL = WidthProvider(Responsive);

/*
* Dashboard component, basically a react-grid-layout with dynamic ability to add
* and remove cells.
*/
class Dashboard extends Component {
    static defaultProps = {
        className: 'layout',
        rowHeight: 30,
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
    };

    constructor(props) {
        super(props);
        this.state = {
            layout: this.props.layout,
        };

        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    

    /**
     * Builds and returns elements based on whatever is found in state.layout.
     * TODO: Change to actual Cell components that is to be displayed
     */
    generateDOM() {
        return _.map(this.state.layout, function(i) {
            return(
                <div key={i.i}>
                    <Jumbotron>
                    <h1>{i.i}</h1>
                    </Jumbotron>
                    
                </div>
            )
        });
    }

    /**
     * Updates specific state with passed props, unless new props are same as old state.
     * @param {*} nextProps 
     * @param {*} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.layout !== prevState.layout) {
            return {
                layout: nextProps.layout
            }
        }
        return null;
    }

    /**
     * Likely the function fired when layout should be saved to localStorage.
     */
    onLayoutChange(layout) {
        this.setState(prevstate => ({
            layout: layout
        }));
    }

    render() {
        return(
            
            <ResponsiveGRL
                className={this.state.className}
                layout={this.state.layout}
                breakpoints={{lg:1200}}
                onLayoutChange={this.onLayoutChange}
            >
                {this.generateDOM()}

            </ResponsiveGRL>
            
        );
    }
}

export default Dashboard;
