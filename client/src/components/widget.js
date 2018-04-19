import React, { Component } from 'react';

class Widget extends Component {
    render() {
        const {children, title} = this.props;

        return(
            <div className="Widget">
                <div className="Widget-title">
                    <h3>{title}</h3>
                </div>
                <div className="Widget-content">
                    {children}
                </div>
            </div>
        );
    }
}

export default Widget;
