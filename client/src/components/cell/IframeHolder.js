import React, {Component} from 'react';

/**
 * Component holding an Iframe. 
 */
class IframeHolder extends Component {
    
    render() {
        return (
            <iframe
                title="Iframe"
                style={{border: '0', height: '100%', width: '100%'}}
                src={this.props.url}>
            </iframe>
        );
    }
}

export default IframeHolder;
