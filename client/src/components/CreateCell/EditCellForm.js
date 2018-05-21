import React, { Component } from 'react';
import {Button, Grid, Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton, Checkbox, ControlLabel, FormControl, FormGroup, Tooltip, OverlayTrigger} from "react-bootstrap";
import FormInput from './FormInput';


class EditCellForm extends Component {
    constructor(props) {
        super(props);
        const {creator, kind, displayType, title, textInput, number, graphUrl, dataSource, attribute, refreshRate, unit} = this.props.values;

        this.state = {
            buttonText: 'Ändra widget',
            creator: creator,
            kind: kind,
            publish: false,
            published: creator ? true : false,
            title: title,
            number: number,
            textInput: textInput,
            graphUrl: graphUrl,
            dataSource: dataSource,
            attribute: attribute,
            unit: unit,
            displayType: displayType,
            refreshRate: refreshRate
        };
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
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
            this.setState({buttonText: 'Ändra och publicera widget'});
        }
        else {
            this.setState({buttonText: 'Ändra widget'});
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

        if(this.state.published) {
            this.props.addCell(widget);
        } else {
            if(this.state.publish) {
                widget.creator=this.state.creator;
                widget.description=this.state.description;
                this.handlePost(widget);
            }
            this.props.editCell(widget, this.props.values.index);
        }

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
    fetch('http://192.168.99.100:3001/api/widgets', {
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
    **/
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
        if (this.state.kind === 'Value') {
            formContent = (
                <div>
                    <FormInput title='Värde' type='number' onChange={this.handleNumberChange} 
                        defaultValue={this.props.values.number} tooltip='Ange det värde som ska visas i widgeten'/>
                    <FormInput title='Datakälla' type='text' onChange={this.handleDataSourceChange}
                        defaultValue={this.props.values.dataSource} tooltip='Ange den datakälla som widgeten ska presentera data ifrån'/>                        
                    <Grid>
                        <Row className='show-grid'>
                            <Col xs={8}>
                                <FormInput title='Data-attribut' type='text' onChange={this.handleAttributeChange}
                                    defaultValue={this.props.values.attribute} tooltip='Ange specifikt attribut från API'/>
                            </Col>
                            <Col xs={4}>
                                <FormInput title='Uppdateringsfrekvens' type='number' onChange={this.handleRefreshChange}
                                    defaultValue={this.props.values.refreshRate} tooltip='I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering'/>
                            </Col>
                        </Row>
                    </Grid>
                    <FormInput title='Enhet' type='text' onChange={this.handleUnitChange}
                        defaultValue={this.props.values.unit} tooltip='Ange enhet som ska visas i widget'/>
                </div>
            );

            buttonKind = (
                <Button 
                    disabled={!this.state.title || !this.state.numer || !this.state.dataSource || !this.state.attribute || !this.state.unit}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            
            if (this.state.number) {
                buttonKind = (
                    <Button 
                    disabled={!this.state.title || !this.state.number}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                if (this.state.publish) {
                    buttonKind = (
                        <Button 
                        disabled={!this.state.title || !this.state.number || (!this.state.creator || !this.state.description)}
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
            }
            if (this.state.dataSource || this.state.attribute) {
                buttonKind = (
                    <Button 
                    disabled={!this.state.title || !this.state.dataSource || !this.state.attribute}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
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
                                            defaultValue={this.props.values.displayType} 
                                            value={this.state.displayType}
                                            onChange={this.handleDisplayTypeChange}>
                                        <ToggleButton value={'Iframe'}>Iframe</ToggleButton> 
                                        <ToggleButton value={'Img'}>Img</ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormInput title='Uppdateringsfrekvens' type='number' onChange={this.handleRefreshChange}
                                    defaultValue={this.props.values.refreshRate} tooltip='I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering'/>
                            </Col>
                        </Row>
                    </Grid>
                    <FormInput title='Diagram-URL' type='text' onChange={this.handleGraphUrlChange}
                        defaultValue={this.props.values.graphUrl} tooltip='Ange URL för inbäddat innehåll att visa'/>
                </div>
            );
            buttonKind = (
                <Button 
                    disabled={!this.state.title || !this.state.graphUrl}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            if (this.state.publish) {
                buttonKind = (
                    <Button 
                    disabled={!this.state.title || !this.state.graphUrl || (!this.state.creator || !this.state.description)}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
            }
        }
        else if(this.state.kind === 'Text') {
            formContent = (
                <div>
                    <FormGroup>
                        <ControlLabel>Fritext</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-textinput">Ange den text som cellen ska visa.</Tooltip>}>
                            <FormControl 
                                componentClass="textarea"
                                placeholder="Ditt innehåll"
                                defaultValue={this.props.values.textInput}
                                onChange={this.handleTextInputChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <FormInput title='Datakälla' type='text' onChange={this.handleDataSourceChange}
                        defaultValue={this.props.values.dataSource} tooltip='URL att hämta data ifrån'/>
                    <Grid>
                        <Row className='show-grid'>
                            <Col xs={8}>
                                <FormInput title='Data-attribut' type='text' onChange={this.handleAttributeChange}
                                        defaultValue={this.props.values.attribute} tooltip='Ange specifikt attribut från API'/>
                            </Col>
                            <Col xs={4}>
                                <FormInput title='Uppdateringsfrekvens' type='number' onChange={this.handleDescriptionChange}
                                    defaultValue={this.props.values.refreshRate} tooltip='I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering'/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
            //Validation on Edit button
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
            if (this.state.dataSource || this.state.attribute) {
                buttonKind = (
                    <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || this.state.textInput} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
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
                <FormInput title='Titel' type='text' onChange={this.handleTitleChange}
                    defaultValue={this.props.values.title} tooltip='Ange titel som widgeten ska ha'/>

                {formContent}
                
                {!this.state.published && 
                <FormGroup>
                    <Checkbox onChange={this.handlePublishChange}>
                        Publicera widget
                    </Checkbox>
                </FormGroup>}

                {this.state.publish &&
                <div>
                    <FormInput title='Skapare' type='text' onChange={this.handleCreatorChange}
                            tooltip='Ange skapare av widget'/>
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

export default EditCellForm;