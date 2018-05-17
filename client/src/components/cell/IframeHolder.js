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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.values.update && !prevProps.values.update) {
            this.forceUpdate();
            // console.log("UPDATE");
            // let tempURL = this.state.frameURL;
            // this.setState({frameURL: null});
            // setTimeout(() => {
            //     this.setState({frameURL: tempURL});
            // }, 10);
        } else {
            console.log("ELSE");
            return;
        }
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
