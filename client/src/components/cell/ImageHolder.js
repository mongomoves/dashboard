import React, {Component} from 'react';

const regexSize = /(&width=)(\d+)(&height=)(\d+)/g;
class ImageHolder extends Component {

    render() {
        if(this.props.height <= 0 || this.props.width <= 0) {
            return null;
        }
        const replaceStr = `&width=${this.props.width}&height=${this.props.height}`;
        const adaptedImageSrc = this.props.image.replace(regexSize, replaceStr);
        console.log("img: " + adaptedImageSrc);
        return(
            <img
                alt='something collected'
                src={adaptedImageSrc}>
            </img>
        );
    }
}

export default ImageHolder;