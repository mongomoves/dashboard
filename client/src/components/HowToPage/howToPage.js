import React, { Component } from 'react';
import CustomNavbar from '../customnavbar/CustomNavbar';
import Article from '../Article/Article';
import Sidebar from '../Sidebar/Sidebar';
import './howToPage.css';

class HowToPage extends Component {
    render() {
        return (
            <div>
                <CustomNavbar />
                <div className="howToContent">
                    <Article />
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default HowToPage;