import React, { Component } from 'react';

class ValueDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {value: null};
    }

    componentDidMount() {
        if (this.props.api && this.props.attribute) {
            fetch(this.props.api)
                .then(res => res.json())
                .then(res => this.setState({value: res[this.props.attribute]}));
        }
        else if (this.props.number) {
            this.setState({value: this.props.number});
        }
    }

    render() {
        const {title} = this.props;
        const {value} = this.state;

        return(
            <div className="ValueDisplay">
                <div className="ValueDisplay-title">
                    <h4>{title}</h4>
                </div>
                <div className="ValueDisplay-value">
                    {value}
                </div>
            </div>
        );
    }
}

export default ValueDisplay;
