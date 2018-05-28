import React from 'react';
import PropTypes from 'prop-types';
import SearchCellsForm from "./SearchCellsForm";
import SearchCellsList from "./SearchCellsList";
import SERVER_URL from '../../constants'

const DEFAULT_REQUEST_URL = SERVER_URL + "/api/widgets";

/**
 * A component used for fetching searched widgets from database and displaying them in a list.
 */
class SearchCells extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cells: [],
            searchById: false,
            noResult: false
        }
    }

    /**
     * Generates a request and uses it to fetch widgets from database
     * when the user clicks on the search button.
     * @param formInput the user input from SearchCellsForm's state
     */
    onSearchClicked = (formInput) => {
        const requestUrl = this.generateRequestUrl(formInput);
        this.fetchWidgetsFromDatabase(requestUrl);
    };

    /**
     * Generates a request url based on a user's input.
     * Handles special search commands and modifies the request url if needed.
     * Adds specified query parameters to request url if needed.
     * @param formInput the user input from SearchCellsForm's state
     * @returns {string} a request url with query parameters based on user input
     */
    generateRequestUrl = (formInput) => {
        const {value, graph, text, search} = formInput;
        const command = search.substring(0, search.indexOf(':'));

        let requestUrl = DEFAULT_REQUEST_URL;
        let isFirstParam = true;

        // Handle special search commands first
        if (command === 'id') {
            const id = search.substring(search.indexOf(':') + 1);

            if (id.trim() !== '') {
                requestUrl += '/' + id;

                this.setState({
                    searchById: true
                });

                return requestUrl;
            }
        }

        // Generate request url based on user input
        if (value) {
            if (isFirstParam) {
                requestUrl += "?kind=Value";
                isFirstParam = false;
            }
            else {
                requestUrl += "&kind=Value"
            }
        }

        if (graph) {
            if (isFirstParam) {
                requestUrl += "?kind=Graph";
                isFirstParam = false;
            }
            else {
                requestUrl += "&kind=Graph"
            }
        }

        if (text) {
            if (isFirstParam) {
                requestUrl += "?kind=Text";
                isFirstParam = false;
            }
            else {
                requestUrl += "&kind=Text"
            }
        }

        if (search && search.trim() !== '' && search.trim() !=='id:') {
            if (isFirstParam) {
                requestUrl += "?search=" + search;
            }
            else {
                requestUrl += "&search=" + search;
            }
        }

        return requestUrl;
    };

    /**
     * Fetches widgets from database and stores result in state
     * @param requestUrl the request url
     */
    fetchWidgetsFromDatabase = (requestUrl) => {
        fetch(requestUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                let cells = [];
                let noResult = true;

                if (this.state.searchById) {
                    if (data) {
                        cells.push(data.widget);
                        noResult = false;
                    }
                }
                else {
                    if (data && data.count > 0) {
                        cells = data.widgets;
                        noResult = false;
                    }
                }

                this.setState({
                    cells: cells,
                    searchById: false,
                    noResult: noResult
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        let content = (
            <div style={listStyle}>
                <SearchCellsList
                    addCell={this.props.addCell}
                    cells={this.state.cells}/>
            </div>
        );

        if(this.state.noResult) {
            content = (
                <div style={{textAlign: 'center'}}>
                    <span style={{fontStyle: 'italic'}}>Inga widgets funna</span>
                </div>
            );
        }

        return(
            <div>
                <div style={formStyle}>
                    <SearchCellsForm
                        onSearchClicked={this.onSearchClicked}
                        defaultSearch={this.props.defaultSearch}/>
                </div>
                {content}
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

SearchCells.propTypes = {
    addCell: PropTypes.func.isRequired,
    defaultSearch: PropTypes.string
};

export default SearchCells;