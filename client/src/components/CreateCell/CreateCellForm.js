import React, { Component } from 'react';
import {Button, Grid, Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton, Checkbox, ControlLabel, FormControl, FormGroup, Tooltip, OverlayTrigger} from "react-bootstrap";
import FormInput from './FormInput';
import SERVER_URL from '../../constants'

class CreateCellForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Skapa widget',
            kind: 'Value',
            publish: false,
            buttonDisabled: false,
            title: '',
            creator: '',
            description: '',
            number: 0,
            graphUrl: '',
            dataSource: '',
            attribute: '',
            unit: '',
            displayType: 'Iframe',
            refreshRate: 0
        };
    }

    handleKindChange = (e) => {
        this.setState({kind: e.target.value});
        
    };

    handleTitleChange = (e) => {
        this.setState({title: e.target.value, titleError: true});
    };

    handleCreatorChange = (e) => {
        this.setState({creator: e.target.value});
    };

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    };

    handleNumberChange = (e) => {
        this.setState({number: e.target.value});
    };

    handleGraphUrlChange = (e) => {
        this.setState({graphUrl: this.checkIframeTag(e.target.value)});
    };

    handleDataSourceChange = (e) => {
        this.setState({dataSource: e.target.value});
    };

    handleAttributeChange = (e) => {
        this.setState({attribute: e.target.value});
    };

    handleUnitChange = (e) => {
        this.setState({unit: e.target.value});
    };

    handleTextInputChange = (e) => {
        this.setState({textInput: e.target.value});
    };

    handlePublishChange = (e) => {
        const checked = e.target.checked;
        this.setState({publish: checked});

        if (checked) {
            this.setState({buttonText: 'Skapa och publicera widget'});
        }
        else {
            this.setState({buttonText: 'Skapa widget'});
        }
    };

    handleDisplayTypeChange = (e) => {
        this.setState({displayType: e});
    }

    handleRefreshChange = (e) => {
        this.setState({refreshRate: e.target.value});
    }

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
        //console.log(`handleCreateWidget:widget=${JSON.stringify(widget)}`);
        if(this.state.publish) {
            widget.creator=this.state.creator;
            widget.description=this.state.description;
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
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(widget),
        })
            .then(function(res) {
                return res.json()
            })
            .then(function(data) {
                this.props.addID(data.widget);
            }.bind(this))
            .catch(err => err);
    };

    /**
     * Tries to check if entered string is a full Iframe tag and returns URL only if so.
     * @param {*} graphUrl String to check and extract url from
     */
    checkIframeTag = (graphUrl) => {
        const iframeTag = '</iframe>';
        const httpRegex = RegExp(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm);
        if(graphUrl.includes(iframeTag)) {
            return graphUrl.match(httpRegex)[0];
        } else {
            return graphUrl;
        }
    }

    render() {
        let formContent;
        let buttonKind;
        // Form fields depends on type of widget
        if (this.state.kind === 'Value') {
            formContent = (
                <div>
                    <FormInput title='Värde' type='number' onChange={this.handleNumberChange}
                        tooltip='Ange det värde som ska visas i widgeten'/>
                    <FormInput title='Datakälla' type='text' onChange={this.handleDataSourceChange}
                        tooltip='Ange den datakälla som widgeten ska presentera data ifrån'/>                        
                    <Grid>
                        <Row className='show-grid'>
                            <Col style={{padding: 0}} xs={8}>
                                <FormInput title='Data-attribut' type='text' onChange={this.handleAttributeChange}
                                    tooltip='Ange specifikt attribut från API'/>
                            </Col>
                            <Col style={{paddingRight: 0}} xs={4}>
                                <FormInput title='Uppdateringsfrekvens' type='number' onChange={this.handleRefreshChange}
                                    tooltip='I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering'/>
                            </Col>
                        </Row>
                    </Grid>
                    <FormInput title='Enhet' type='text' onChange={this.handleUnitChange}
                        tooltip='Ange enhet för värdet'/>
                </div>
            );
            //Default button for widget kind value.
            buttonKind = (
                <Button
                        disabled={!this.state.title || !this.state.number || !this.state.dataSource || !this.state.attribute || !this.state.unit} 
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            //Button of the kind number.
            if (this.state.number) {
                buttonKind = (
                    <Button
                            disabled={!this.state.title || !this.state.number} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                //Button for publishing number widget.
                if (this.state.publish) {
                    buttonKind = (
                        <Button
                            disabled={!this.state.title || !this.state.number || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
            
            }
            //Button for data source widget, disabled if dataSource and data attribute is empty.
            if (this.state.dataSource || this.state.attribute) {
                buttonKind = (
                    <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                //Button for data source widget when published, disabled if creator and description is empty.
                if (this.state.publish) {
                    buttonKind = (
                        <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }      
            }
        }
        else if (this.state.kind === 'Graph') {
            formContent = (
                <div>
                    <Grid>
                        <Row>
                            <Col xs={8}>
                                <FormGroup>
                                    <ControlLabel>Visningstyp</ControlLabel>
                                    <ButtonToolbar>
                                    <ToggleButtonGroup 
                                            type='radio'
                                            name='displayType' 
                                            defaultValue={'Iframe'}
                                            value={this.state.displayType}
                                            onChange={this.handleDisplayTypeChange}>
                                        <ToggleButton value={'Iframe'}>Iframe</ToggleButton> 
                                        <ToggleButton value={'Img'}>Img</ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Col>
                            <Col style={{paddingRight: 0}} xs={4}>
                                <FormInput title='Uppdateringsfrekvens' type='number' onChange={this.handleRefreshChange}
                                    tooltip='I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering'/>
                            </Col>
                        </Row>
                    </Grid>
                    <FormInput title='Diagram-URL' type='text' onChange={this.handleGraphUrlChange}
                        tooltip='Ange URL för inbäddat innehåll att visa'/>
                </div>
            );
            
            //Button for graph widget, disabled when graphUrl and title is empty.
            buttonKind = (
                <Button
                        disabled={!this.state.graphUrl || !this.state.title} 
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            //Button for publishing graph widget, disabled when creator and description is empty.
            if (this.state.publish) {
                buttonKind = (
                    <Button
                            disabled={!this.state.graphUrl || !this.state.title || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
            }
        }
        else if(this.state.kind === 'Text') {
            formContent = (
                <div>
                    <FormGroup>
                        <ControlLabel>Fritext</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-textinput">Ange den text som cellen ska visa</Tooltip>}>
                            <FormControl 
                                componentClass="textarea"
                                placeholder="Ditt innehåll"
                                onChange={this.handleTextInputChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <FormInput title='Datakälla' type='text' onChange={this.handleDataSourceChange}
                        tooltip='URL att hämta data ifrån'/>
                    <Grid>
                        <Row className='show-grid'>
                            <Col style={{padding: 0}} xs={8}>
                                <FormInput title='Data-attribut' type='text' onChange={this.handleAttributeChange}
                                    tooltip='Ange specifikt attribut från API'/>
                            </Col>
                            <Col style={{paddingRight: 0}} xs={4}>
                                <FormInput title='Uppdateringsfrekvens' type='number' onChange={this.handleDescriptionChange}
                                    tooltip='I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering'/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
            //Default button for widget kind value.
            buttonKind = (
                <Button
                        disabled={!this.state.title || !this.state.textInput || !this.state.dataSource || !this.state.attribute} 
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            if(this.state.textInput) {
                buttonKind = (
                    <Button
                        disabled={!this.state.title || (this.state.dataSource || this.state.attribute)}
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                if (this.state.publish) {
                    buttonKind = (
                        <Button
                            disabled={!this.state.title || !this.state.textInput || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
            }
            //Button for data source widget, disabled if dataSource and data attribute is empty.
            if (this.state.dataSource || this.state.attribute) {
                buttonKind = (
                    <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || this.state.textInput} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                //Button for data source widget when published, disabled if creator and description is empty.
                if (this.state.publish) {
                    buttonKind = (
                        <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
            }
        }

        return (
            <form>
                <FormGroup controlId='kind'>
                    <ControlLabel>Widget-typ</ControlLabel>
                    <FormControl componentClass='select' value={this.state.kind} onChange={this.handleKindChange}>
                        <option value='Value'>Värde</option>
                        <option value='Graph'>Diagram</option>
                        <option value='Text'>Text</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Title</ControlLabel>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-number">Ange titel som widgeten ska ha. Max 50 tecken</Tooltip>}>
                        <FormControl
                            maxLength='50'
                            type='text'
                            onChange={this.handleTitleChange}/>
                    </OverlayTrigger>
                </FormGroup>

                {formContent}

                <FormGroup>
                    <Checkbox onChange={this.handlePublishChange}>
                        Publisera widget
                    </Checkbox>
                </FormGroup>

                {this.state.publish &&
                <div>
                    <FormInput title='Skapare' type='text' onChange={this.handleCreatorChange}
                        tooltip='Ange namn på den som skapat widgeten'/>
                    <FormInput title='Beskrivning' type='text' onChange={this.handleDescriptionChange}
                        tooltip='Ange beskrivande förklaring av widgetens innehåll'/>
                </div>
                }

                <ButtonToolbar>
                    {buttonKind}
                </ButtonToolbar>
            </form>
        )
    }
}

export default CreateCellForm;