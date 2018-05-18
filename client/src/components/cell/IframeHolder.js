import React, {Component} from 'react';

/**
 * Component holding an Iframe.
 * Capable of regular refreshing.
 */
class IframeHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    /**
     * React lifecycle function. At the start of the lifecycle iframe src is set
     * and a update interval is initialised if one is meant to be.
     */
    componentDidMount() {
        if(this.props.values.graphUrl) {
            this.setState({frameURL: this.props.values.graphUrl});
        }
        if(this.props.values.refreshRate && this.props.values.refreshRate > 0) {
            let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
            this.setState({interval: intervalID});
        } 
    }

    /**
     * React lifecycle function. Clears the interval handling the component refresh.
     */
    componentWillUnmount() {
        if(this.state.interval) {
            clearInterval(this.state.interval);
        } 
    }

    /**
     * React lifecycle function. Makes sure the component is editable
     * when passed new props, including different refresh rates.
     * @param {*} prevProps
     * @param {*} prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if(this.props.values.refreshRate !== prevProps.values.refreshRate) {
            if(this.state.interval) {
                clearInterval(this.state.interval);
            }
            if(this.props.values.refreshRate > 0) {
                let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
                this.setState({interval: intervalID});
            }
        } else if (this.props.values.graphUrl !== prevProps.values.graphUrl) {
            this.updateContent();
        }
    }

    /**
     * Refreshes the Iframe by nulling the state, so that a refresh can occur without
     * new properties being passed.
     */
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
