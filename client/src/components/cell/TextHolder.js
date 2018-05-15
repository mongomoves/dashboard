import React, {Component} from 'react';

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
        this.fetchText();
    }

    fetchText = () => {
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
                    this.setState({text: 'Felaktigt attribut, ingen data hämtad'});
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
                        <span style={{...spanStyleText, fontSize: `${this.calcFont()}%`}}>
                            {JSON.stringify(el)}
                        </span>
            )
        });
        return newArray;
    }

    calcFont = () => {
        // let size = 0.5 * (this.props.width + 16);
        let size = this.props.width / 2;
        if(size < 200) {
            return 200;
        }
        return size;
    }

    render() {
        let content;
        if(this.state.isArray) {
            content = this.printArray(this.state.text);
        } else {
            content = (
                //<span style={{...spanStyleText, fontSize: `${this.props.width / 2}%`}}>{this.state.text}</span>
                <span style={{...spanStyleText, fontSize: `${this.calcFont()}%`}}>{this.props.values.textInput}</span>
            )
        }
        return (
            <div style={{...divStyle, height: this.props.height - 33, width: this.props.width}}>
                {content}
            </div>
        )
    }
}

export default TextHolder;

const spanStyleText = {
    fontWeight: "bold",
    display: "inlineBlock",
    paddingRight: "5%",
    color: "orange"
};

const divStyle={
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};