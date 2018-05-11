import React, {Component} from 'react';

class IframeHolder extends Component {
    
    render() {
        if(this.props.height <= 0 || this.props.width <= 0) {
            return null;
        }
        return (
            <iframe
                title="Iframe"
                width={this.props.width}
                height={this.props.height}
                src={this.props.url}>
            </iframe>
        );
    }
}

export default IframeHolder;
