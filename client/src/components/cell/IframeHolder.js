import React, {Component} from 'react';

/**
 * Component holding an Iframe. 
 */
class IframeHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        if(this.props.values.graphUrl) {
            this.setState({frameURL: this.props.values.graphUrl});
        }
        if(this.props.values.refreshRate && this.props.values.refreshRate > 0) {
            let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
            this.setState({interval: intervalID});
        } 
    }

    componentWillUnmount() {
        if(this.state.interval) {
            clearInterval(this.state.interval);
        } 
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.values.refreshRate !== prevProps.values.refreshRate) {
            if(this.state.interval) {
                clearInterval(this.state.interval);
            }
            if(this.props.values.refreshRate > 0) {
                let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
                this.setState({interval: intervalID});
            }
        }
    }

    updateContent = () => {
        this.setState({frameURL: null});
        this.setState({frameURL: this.props.values.graphUrl});
    }

    render() {
        if(this.props.height <= 0 || this.props.width <= 0) {
            return null;
        }
        return (
            <iframe
                title="Iframe"
                style={{border: '0', height: '100%', width: '100%'}}
                width={this.props.width}
                height={this.props.height}
                src={this.state.frameURL}>
            </iframe>
        );
    }
}

export default IframeHolder;
