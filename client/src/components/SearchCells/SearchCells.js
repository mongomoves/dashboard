import React from 'react';
import PropTypes from 'prop-types';
import SearchCellsForm from "./SearchCellsForm";
import SearchCellsList from "./SearchCellsList";
import SERVER_URL from '../../constants'

const DEFAULT_REQUEST_URL = SERVER_URL + "/api/widgets";

class SearchCells extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cells: [],
            searchById: false,
            noResult: false
        }
    }

    onSearchClicked = (options) => {
        const requestUrl = this.generateRequestUrl(options);
        this.fetchWidgetsFromDatabase(requestUrl);
    };

    generateRequestUrl = (options) => {
        const {value, graph, text, search} = options;
        const command = search.substring(0, search.indexOf(':'));

        let requestUrl = DEFAULT_REQUEST_URL;
        let isFirstParam = true;

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