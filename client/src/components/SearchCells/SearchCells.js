import React from 'react';
import SearchCellsForm from "./SearchCellsForm";
import SearchCellsList from "./SearchCellsList";
import SERVER_URL from '../../constants'

const DEFAULT_REQUEST_URL = SERVER_URL + "/api/widgets";

class SearchCells extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cells: []
        }
    }

    onSearchClicked = (options) => {
        this.generateRequestUrl(options);
    };

    generateRequestUrl = (options) => {
        let requestUrl = DEFAULT_REQUEST_URL;
        let isFirstParam = true;

        if (options.value) {
            if (isFirstParam) {
                requestUrl += "?kind=Value";
                isFirstParam = false;
            }
            else {
                requestUrl += "&kind=Value"
            }
        }

        if (options.graph) {
            if (isFirstParam) {
                requestUrl += "?kind=Graph";
                isFirstParam = false;
            }
            else {
                requestUrl += "&kind=Graph"
            }
        }

        if (options.text) {
            if (isFirstParam) {
                requestUrl += "?kind=Text";
                isFirstParam = false;
            }
            else {
                requestUrl += "&kind=Text"
            }
        }

        if (options.search && options.search !== '') {
            if (isFirstParam) {
                requestUrl += "?search=" + options.search;
                isFirstParam = false;
            }
            else {
                requestUrl += "&search=" + options.search;
            }
        }
        console.log(requestUrl);
        this.fetchWidgetsFromDatabase(requestUrl);
    };

    fetchWidgetsFromDatabase = (requestUrl) => {
        fetch(requestUrl)
            .then(result => {
                return result.json();
            })
            .then(data => {
                const cells = data.widgets;
                this.setState({cells: cells});
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return(
            <div>
                <div style={formStyle}>
                    <SearchCellsForm onSearchClicked={this.onSearchClicked}/>
                </div>
                <div style={listStyle}>
                    <SearchCellsList addCell={this.props.addCell} cells={this.state.cells}/>
                </div>
            </div>
        );
    }
}

const listStyle = {
    maxHeight: "60vh",
    overflowY: 'auto'
};

const formStyle = {
    paddingBottom: '1em'
};

export default SearchCells;