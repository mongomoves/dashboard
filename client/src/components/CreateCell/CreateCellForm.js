import React, {Component} from 'react';
import {
    Button,
    ButtonToolbar,
    Checkbox,
    ControlLabel,
    FormControl,
    FormGroup,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";
import FormInput from './FormInput';
import ValueForm from "./ValueForm";
import GraphForm from "./GraphForm";
import TextForm from "./TextForm";
import SERVER_URL from '../../constants'

class CreateCellForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kind: 'Value',
            publish: false,
            title: '',
            creator: '',
            description: '',
            number: 0,
            graphUrl: '',
            textInput: '',
            dataSource: '',
            attribute: '',
            unit: '',
            displayType: 'Iframe',
            refreshRate: 0
        };
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleGraphUrlChange = (e) => {
        this.setState({graphUrl: this.checkIframeTag(e.target.value)});
    };

    handleDisplayTypeChange = (e) => {
        this.setState({displayType: e});
    };

    handleCreateWidget = () => {
        let widget;
        if (this.state.kind === 'Value') {
            widget = {
                kind: this.state.kind,
                title: this.state.title,
                number: this.state.number,
                dataSource: this.state.dataSource,
                attribute: this.state.attribute,
                refreshRate: this.state.refreshRate,
                unit: this.state.unit
            }   
        }
        else if (this.state.kind === 'Graph') {
            widget = {
                kind: this.state.kind,
                title: this.state.title,
                displayType: this.state.displayType,
                graphUrl: this.state.graphUrl,
                refreshRate: this.state.refreshRate
            }
        } 
        else if (this.state.kind === 'Text') {
            widget = {
                kind: this.state.kind,
                title: this.state.title,
                textInput: this.state.textInput,
                dataSource: this.state.dataSource,
                attribute: this.state.attribute,
                refreshRate: this.state.refreshRate
            }
        }

        if (this.state.publish) {
            widget.creator = this.state.creator;
            widget.description = this.state.description;

            this.handlePost(widget);
        }

        this.props.addCell(widget);

        if (this.props.done) {
            this.props.done();
        }
    };

    /**
    * Publishes the created widget though Post request to backend. Sends response to addID in App to associate widget ID
    * from backend to the widget in frontend.
    * @param {*} widget the widget to post to backend.
    **/
    handlePost = (widget) => {
        fetch(SERVER_URL + '/api/widgets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(widget)
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(data) {
                this.props.addID(data.widget);
            }.bind(this))
            .catch(err => console.log(err));
    };

    /**
     * Tries to check if entered string is a full Iframe tag and returns URL only if so.
     * @param {*} graphUrl String to check and extract url from
     */
    checkIframeTag = (graphUrl) => {
        const iframeTag = '</iframe>';
        const httpRegex = RegExp(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm);
        if(graphUrl.includes(iframeTag)) {
            return graphUrl.match(httpRegex)[0];
        } else {
            return graphUrl;
        }
    };

    render() {
        const buttonText = this.state.publish ? 'Skapa och publicera widget' : 'Skapa widget';
        let disableButton = true;
        let formContent;

        // Form fields depends on type of widget
        if (this.state.kind === 'Value') {
            formContent = (
                <ValueForm
                number={this.state.number}
                dataSource={this.state.dataSource}
                attribute={this.state.attribute}
                unit={this.state.unit}
                refreshRate={this.state.refreshRate}
                handleInputChange={this.handleInputChange}/>
            );

            // Check if create button should be disabled
            if (this.state.number) {
                disableButton = !this.state.title || !this.state.number;

                if (this.state.publish) {
                    disableButton = !this.state.title || !this.state.number ||
                                    (!this.state.creator || !this.state.description);
                }
            }

            if (this.state.dataSource || this.state.attribute) {
                disableButton = !this.state.title || !this.state.dataSource || !this.state.attribute;

                if (this.state.publish) {
                    disableButton = !this.state.title || !this.state.dataSource || !this.state.attribute ||
                                    (!this.state.creator || !this.state.description);
                }
            }
        }
        else if (this.state.kind === 'Graph') {
            formContent = (
                <GraphForm
                    graphUrl={this.state.graphUrl}
                    displayType={this.state.displayType}
                    refreshRate={this.state.refreshRate}
                    handleInputChange={this.handleInputChange}
                    handleDisplayTypeChange={this.handleDisplayTypeChange}
                    handleGraphUrlChange={this.handleGraphUrlChange}/>
            );

            // Check if create button should be disabled
            disableButton = !this.state.graphUrl || !this.state.title;

            if (this.state.publish) {
                disableButton = !this.state.graphUrl || !this.state.title ||
                                (!this.state.creator || !this.state.description);
            }
        }
        else if(this.state.kind === 'Text') {
            formContent = (
                <TextForm
                    textInput={this.state.textInput}
                    dataSource={this.state.dataSource}
                    attribute={this.state.attribute}
                    unit={this.state.unit}
                    refreshRate={this.state.refreshRate}
                    handleInputChange={this.handleInputChange}/>
            );

            // Check if create button should be disabled
            if (this.state.textInput) {
                disableButton = !this.state.title || !this.state.textInput;

                if (this.state.publish) {
                    disableButton = !this.state.title || !this.state.textInput ||
                                    (!this.state.creator || !this.state.description);
                }
            }

            if (this.state.dataSource || this.state.attribute) {
                disableButton = !this.state.title || !this.state.dataSource || !this.state.attribute;

                if (this.state.publish) {
                    disableButton = !this.state.title || !this.state.dataSource || !this.state.attribute ||
                                    (!this.state.creator || !this.state.description);
                }
            }
        }

        return (
            <form>
                <FormGroup controlId='kind'>
                    <ControlLabel>Widget typ</ControlLabel>
                    <FormControl
                        componentClass='select'
                        name='kind'
                        value={this.state.kind}
                        onChange={this.handleInputChange}>

                        <option value='Value'>Värde</option>
                        <option value='Graph'>Diagram</option>
                        <option value='Text'>Text</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Titel</ControlLabel>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-number">Ange titel som widgeten ska ha. Max 50 tecken</Tooltip>}>
                        <FormControl
                            maxLength='50'
                            type='text'
                            value={this.state.title}
                            name='title'
                            onChange={this.handleInputChange}/>
                    </OverlayTrigger>
                </FormGroup>

                {formContent}

                <FormGroup>
                    <Checkbox
                        name="publish"
                        value={this.state.publish}
                        onChange={this.handleInputChange}>
                        Publicera widget
                    </Checkbox>
                </FormGroup>

                {this.state.publish &&
                <div>
                    <FormInput
                        title='Skapare'
                        type='text'
                        value={this.state.creator}
                        name='creator'
                        onChange={this.handleInputChange}
                        tooltip='Ange namn på den som skapat widgeten'/>
                    <FormInput
                        title='Beskrivning'
                        type='text'
                        value={this.state.description}
                        name='description'
                        onChange={this.handleInputChange}
                        tooltip='Ange beskrivande förklaring av widgetens innehåll'/>
                </div>
                }

                <ButtonToolbar>
                    <Button
                        disabled={disableButton}
                        bsStyle='primary' onClick={this.handleCreateWidget}>{buttonText}</Button>
                </ButtonToolbar>
            </form>
        )
    }
}

export default CreateCellForm;