import React, { Component } from 'react';
import RenderPath from './components/RenderPath/renderPath';

//Component that renders the choosen path on the website.

class Main extends Component {
    render() {
        return (
            <div>
                <RenderPath />
            </div>
        );
    }

}

export default Main;