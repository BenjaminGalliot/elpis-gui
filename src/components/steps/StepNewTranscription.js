import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AccordionFluid from '../Semantics Components/AccordionFluid'
import { Grid, Header, Segment, Icon, List, Button, } from 'semantic-ui-react';

export default class StepNewTranscription extends Component {
    render() {
        return (
            <div>
                <Header as='h1'>ELPIS LOGO (ACCELERATE TRANSCRIPTION)</Header>

                <Segment>
                    <Grid centered>
                            <Grid.Column width={6}>
                                <AccordionFluid title={'Step 1'}/>
                                <AccordionFluid title={'Step 2'}/>
                                <AccordionFluid title={'Step 3'} active/>
                            </Grid.Column>

                            <Grid.Column width={10}>
                                <Header as='h1' text> <Icon name='computer' />Transcribe some audio with an exisiting model</Header>  

                                <Segment placeholder>
                                    <Header icon>
                                    <Icon name='file audio outline' />
                                    Drag and drop audio and transcription files here
                                    </Header>
                                    <Button primary>Add Document</Button>
                                </Segment>

                                <Header as='h1' text> Choose a model</Header>
                               <Grid>
                                    <Grid.Column>
                                        <List>
                                            <List.Item>
                                                <List.Icon name='square outline'/>
                                                <List.Content>English-Indonesian 1-gram</List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Icon name='square outline'/>
                                                <List.Content>English-Indonesian 3-gram</List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Icon name='square outline'/>
                                                <List.Content>English-Indonesian 5-gram with Indonesian 12s</List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Icon name='square outline'/>
                                                <List.Content>Indoesian 1-gram</List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Icon name='square outline'/>
                                                <List.Content>Everything 3-gram with Indonesian 12s</List.Content>
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                </Grid>
                                
                                <Button type='submit' as={Link} to="/transcription-results">Go</Button>
                            </Grid.Column>
                       
                    </Grid>  
                </Segment>
            </div>
        );
    }
}