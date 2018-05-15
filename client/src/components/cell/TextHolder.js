import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

/**
 * Component capable of holding textual information.
 */
class TextHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isArray: false
        }
    }

    componentDidMount() {
        if(this.props.values.dataSource) {
            fetch(this.props.values.dataSource)
            .then(res => res.json())
            .then((out) => {
                const apiText = this.getValueByKey(out, this.props.values.attribute);
                if(typeof apiText === 'string' || apiText instanceof String) {
                    this.setState({text: apiText});
                } else if (Array.isArray(apiText)) {
                    this.setState({isArray: true, text: apiText});
                } else {
                    this.setState({text: 'Incorrect attribute provided'});
                }
            });
        } else if (this.props.values.textInput) {
            this.setState({text: this.props.values.textInput});
        }
    }

    getValueByKey = (object, key) => {
        var stack = [object];
        var current, index, value;
        while (stack.length) {
            current = stack.pop();
            for (index in current) {
                value = current[index];
                if (key === index) {
                    return value;
                }
                else if (value !== null && typeof value === 'object') {
                    stack.unshift(value);
                }
            }
        }
    }

    printArray = (array) => {
        let newArray = array.map(el => {
          return (
                <Row className='show-grid'>
                    <Col lg={12}>
                        <span style={{...spanStyleText, fontSize: `${this.props.width / 10}px`}}>
                            {JSON.stringify(el)}
                        </span>
                    </Col>
                </Row>
          )
        });
        return newArray;
    }

    render() {
        let content;
        if(this.state.isArray) {
            content = this.printArray(this.state.text);
        } else {
            content = (
                <Row className="show-grid">
                    <Col lg={12}>
                    <span style={{...spanStyleText, fontSize: `${this.props.width / 10}px`}}>{this.state.text}</span>
                    </Col>
                </Row>
            )
        }
        return (
            <Grid>
                {content}
            </Grid>
        )
    }
}

export default TextHolder;

const spanStyleText = {
    fontWeight: "bold",
    display: "inlineBlock",
    paddingRight: "5%",
    color: "orange"
}