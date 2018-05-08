import React, {Component} from 'react';

/**
 * Shows information about a specific cell. Author, date and description.
 * Meant to be used in a modal.
 */
class CellInfo extends Component {
    render() {
        return (
            <div>
                <span>Skapad av {this.props.author}</span>
                <span>{this.props.date}</span>
                <p>{this.props.desc}</p>
            </div>
        )
    }
}

export default CellInfo;