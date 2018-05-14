import React, {Component} from 'react';

const regexWidth = /(&width=)(\d+)/g;
const regexHeight = /(&height=)(\d+)/g;

/**
 * Component simply holding an <img> tag, but with the ability
 * to scale based on the parent container's size.
 */
class ImageHolder extends Component {

    render() {
        if(this.props.height <= 0 || this.props.width <= 0) {
            return null;
        }
        let replaceStr = `&width=${this.props.width}`;
        let adaptedImageSrc = this.props.image.replace(regexWidth, replaceStr);
        replaceStr = `&height=${this.props.height}`;
        adaptedImageSrc = adaptedImageSrc.replace(regexHeight, replaceStr);
        return(
            <img
                alt='something collected'
                src={adaptedImageSrc}>
            </img>
        );
    }
}

export default ImageHolder;