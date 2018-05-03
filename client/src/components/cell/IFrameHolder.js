import React, {Component} from 'react';

class IFrameHolder extends Component {

    render() {
        return(
            <iframe
                className="cellData" 
                title={'iframeTitle'}
                src={this.props.iframe}
                frameBorder='0'>
            </iframe>
        );
    }
}

export default IFrameHolder;