import React, {Component} from 'react';

/**
 * Component holding an Iframe.
 * Capable of regular refreshing.
 */
class IframeHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameKey: 1
        }   
    }

    /**
     * React lifecycle function. At the start of the lifecycle iframe src is set
     * and a update interval is initialised if one is meant to be.
     */
    componentDidMount() {
        this.props.onRef(this);
        if(this.props.values.graphUrl) {
            this.setState({frameURL: this.checkForHTTP(this.props.values.graphUrl)});
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
        this.props.onRef(undefined);
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
     * Increments the key set to the iframe tag to force a rerender.
     * This is an improper implementation, but it provides important functionality.
     */
    keyUpdate = () => {
        this.setState((oldState) => ({
            frameKey: oldState.frameKey + 1
        }));
    }

    /**
     * Refreshes the Iframe by nulling the state, so that a refresh can occur without
     * new properties being passed.
     */
    updateContent = () => {
        this.setState({frameURL: null});
        this.setState({frameURL: this.checkForHTTP(this.props.values.graphUrl)});
    }

    /**
     * Checks if URL for Iframe contains http or https. If either is missing
     * the Iframe will display the entire Dashboard page as an embed. This avoids that
     * but it will not stop the user from entering an invalid URL.
     */
    checkForHTTP = (url) => {
        if(url.includes('http://', 0) || url.includes('https://', 0)) {
            this.setState({proper: true});
            return url;
        } else {
            this.setState({proper: false});
            return 'about:blank';
        }
    }

    render() {
        if(this.props.height <= 0 || this.props.width <= 0) {
            return null;
        }

        if(this.state.proper) {
            return (
                <iframe key={this.state.frameKey}
                    title="Iframe"
                    style={{border: '0', height: '100%', width: '100%'}}
                    width={this.props.width}
                    height={this.props.height}
                    src={this.state.frameURL}>
                </iframe>
            )
        } else {
            return (
                <span style={errorStyle}>Ett fel inträffade.<br/>
                    Förmodligen felaktig URL.</span>
            )
        }
    }
}

export default IframeHolder;

const errorStyle = {
    fontWeight: "bold",
    display: "inlineBlock",
    paddingRight: "5%",
    color: "orange"
}