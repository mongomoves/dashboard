import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './catchUrl.css';

class CatchUrl extends Component {
    render() {
        return (
            <div className="catchUrlDiv">
                <h2>Sorry, no page with this url exists... Try one of these links below!</h2>
                <Link className="catchUrl" to='/'>Dashboard Page</Link>
                <Link className="catchUrl" to='/howtopage'>How to page</Link>
            </div>
        );
    }
}

export default CatchUrl;