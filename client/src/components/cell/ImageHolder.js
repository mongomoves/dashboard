import React, {Component} from 'react';
import PropTypes from 'prop-types';

const regexWidth = /(&width=)(\d+)/g;
const regexHeight = /(&height=)(\d+)/g;

/**
 * Component simply holding an <img> tag, but with the ability
 * to scale based on the parent container's size.
 */

class ImageHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    /**
     * React lifecycle function. Sets the initial img src and refresh rate if any.
     */
    componentDidMount() {
        if(this.props.values.graphUrl) {
            this.setState({imgSrc: this.setSize(this.props.values.graphUrl)});
        }
        if(this.props.values.refreshRate && this.props.values.refreshRate > 0) {
            let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
            this.setState({interval: intervalID});
        }
    }

    /**
     * React lifecycle function. Clears the interval when component unmounts.
     */
    componentWillUnmount() {
        if(this.state.interval) {
            clearInterval(this.state.interval);
        }
    }

    /**
     * React lifecycle function. Called when component recieves new props.
     * Makes the component updateable, for different refresh rates, sizes or src.
     * @param {*} prevProps 
     * @param {*} nextState 
     */
    componentDidUpdate(prevProps, nextState) {
        if(this.props.values.refreshRate !== prevProps.values.refreshRate) {
            if(this.state.interval) {
                clearInterval(this.state.interval);
            }
            if(this.props.values.refreshRate > 0) {
                let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
                this.setState({interval: intervalID});
            }
        } else if(this.props.values.graphUrl !== prevProps.values.graphUrl) {
            this.setState({imgSrc: this.setSize(this.props.values.graphUrl)});
        } else if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
            this.setState({imgSrc: this.setSize(this.props.values.graphUrl)});
        }
    }

    /**
     * Sets new imgSrc state, via the setState function so it fits
     * the current container.
     */
    updateContent = () => {
        this.setState({imgSrc: null});
        this.setState({imgSrc: this.setSize(this.props.values.graphUrl)});
    }

    /**
     * Returns an img src url with query parameters for width and height based
     * on the current props.
     */
    setSize = (url) => {
        let replaceStr = `&width=${this.props.width}`;
        let adaptedImageSrc = this.props.values.graphUrl.replace(regexWidth, replaceStr);
        replaceStr = `&height=${this.props.height}`;
        return adaptedImageSrc = adaptedImageSrc.replace(regexHeight, replaceStr);
    }

    /**
     * React render function.
     */
    render() {
        if(this.props.height <= 0 || this.props.width <= 0) {
            return null;
        }
        return(
            <img
                alt='something collected'
                src={this.state.imgSrc}>
            </img>
        );
    }
}

ImageHolder.propTypes = {
    values: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default ImageHolder;