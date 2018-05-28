import React from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, FormControl, FormGroup, OverlayTrigger, Tooltip} from "react-bootstrap";

/**
 * A form with a search field and checkboxes for filtering by widget type.
 */
class SearchCellsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            value: true,
            graph: true,
            text: true
        }
    }

    /**
     * React lifecycle method
     */
    componentDidMount() {
        if (this.props.defaultSearch) {
            this.setState({search: this.props.defaultSearch});
        }
    }

    /**
     * Handles form input change and stores change in state.
     * @param e the input event
     */
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSearchClicked = (e) => {
        this.props.onSearchClicked(this.state);
    };

    render() {
        return(
            <div>
                <FormGroup>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-number">Ange sökord</Tooltip>}>
                        <FormControl
                            type='text'
                            name='search'
                            value={this.state.search}
                            onChange={this.handleInputChange}/>
                    </OverlayTrigger>
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        inline
                        name="value"
                        checked={this.state.value}
                        onChange={this.handleInputChange}>
                        Värde
                    </Checkbox>
                    <Checkbox
                        inline
                        name="graph"
                        checked={this.state.graph}
                        onChange={this.handleInputChange}>
                        Diagram
                    </Checkbox>
                    <Checkbox
                        inline
                        name="text"
                        checked={this.state.text}
                        onChange={this.handleInputChange}>
                        Text
                    </Checkbox>
                </FormGroup>
                <Button
                    bsStyle='primary'
                    onClick={this.handleSearchClicked}>
                    Sök
                </Button>
            </div>
        );
    }
}

SearchCellsForm.propTypes = {
    onSearchClicked: PropTypes.func.isRequired,
    defaultSearch: PropTypes.string
};

export default SearchCellsForm;