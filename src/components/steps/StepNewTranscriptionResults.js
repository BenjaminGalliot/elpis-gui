import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Divider, Grid, Header, Segment, Card, Button } from 'semantic-ui-react';
import StepBranding from './StepBranding';
import StepInformer from '../StepInformer';
import { translate } from 'react-i18next';

class StepNewTranscriptionResults extends Component {
    render() {
        const { t } = this.props;
        // TODO get this from redux?
        const modelName = "English-Indonesian 5-gram with Indonesian 12s"
        const audioName = "some-audio.wav"

        return (
            <div>
                <StepBranding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={ 5 }>
                            <StepInformer />
                        </Grid.Column>

                        <Grid.Column width={ 11 }>
                            <Header as='h1' text='true'>
                                { t('newTranscriptionResults.title') }
                            </Header>

                            <p>{ t('newTranscriptionResults.usingModel', { modelName }) } </p>
                            <p>{ t('newTranscriptionResults.usingAudio', { audioName }) } </p>

                            <Card fluid>
                                <Card.Content header={ t('newTranscriptionResults.errorLogHeader') } />
                                <Card.Content description='Were there any errors? Just output the log, nothing fancy' />
                            </Card>

                            <Card fluid>
                                <Card.Content header={ t('newTranscriptionResults.resultsHeader') } />
                                <Card.Content description='Blah Blah Blah Blah Blah' />
                            </Card>

                            <Divider />

                            <Button as={ Link } to="/">
                                { t('newTranscriptionResults.downloadElanButton') }
                            </Button>

                            <Button as={ Link } to="/">
                                { t('newTranscriptionResults.downloadPraatButton') }
                            </Button>

                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}
export default translate('common')(StepNewTranscriptionResults)
