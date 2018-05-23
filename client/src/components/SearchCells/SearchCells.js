import React from 'react';
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
            result: true
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

        if (search && search !== '') {
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
                const cells = this.state.searchById ? data : data.widgets;
                this.setState({
                    cells: cells,
                    searchById: false,
                    result: data.count
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        let content = (
            <div style={listStyle}>
                <SearchCellsList addCell={this.props.addCell} cells={this.state.cells}/>
            </div>
            )
        if(!this.state.result) {
            content = (
                <div style={{textAlign: 'center'}}>
                    <span style={{fontStyle: 'italic'}}>Inga widgets funna</span>
                </div>
                )
        }
        return(
            <div>
                <div style={formStyle}>
                    <SearchCellsForm onSearchClicked={this.onSearchClicked}/>
                </div>
                {content}
                {/* <div style={listStyle}>
                    <SearchCellsList addCell={this.props.addCell} cells={this.state.cells}/>
                </div> */}
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