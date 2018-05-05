import React, {Component} from 'react';

class ImageHolder extends Component {

    render() {
        console.log(this.props.width + " & " + this.props.height);
        let str = this.props.image;
        let newStr = str.replace;
        //width=^[0-9]*$
        return(
            <img
                className="cellData"
                src={this.props.image}>
            </img>
        );
    }
}

export default ImageHolder;