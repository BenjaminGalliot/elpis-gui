import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Header, Segment, Icon, Card, Button} from 'semantic-ui-react';
import StepBranding from './StepBranding';
import AccordionFluid from '../Semantics Components/AccordionFluid'

export default class StepTrainingError extends Component {
    render() {
        return (
            <div>
                <StepBranding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={5}>
                            <AccordionFluid title={'Step 1'}/>
                            <AccordionFluid title={'Step 2'} active/>
                            <AccordionFluid title={'Step 3'}/>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Header as='h1' text='true'> <Icon name='warning' /> Error occured while training the model </Header>
                            <p>We ran into a problem when training the model</p>
                            <p>Please click the button below to connect you to a tech person on slack</p>
                            <p>An error file detailing the log showing below will be sent as an attachment to the technical team on slack</p>

                        <Card>
                            <Card.Content header='Error Log' />
                            <Card.Content description= 'Error logs spited out while training model' />
                        </Card>
                        <Button href="https:slack.com/" target="_blank">Contact a Tech-person</Button>
                        <Button as={Link} to="/model-settings" >Go back to model settings</Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}