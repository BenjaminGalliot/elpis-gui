import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Divider, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { modelLexicon } from 'redux/actions';
import Branding from 'components/Steps/Shared/Branding';
import Informer from 'components/Steps/Shared/Informer';
import CurrentModelName from "./CurrentModelName";
import urls from 'urls'

class ModelLexicon extends Component {
    componentDidMount() {
        const {modelLexicon} = this.props
        modelLexicon()
    }

    render() {
        const { t, lexicon, name } = this.props;
        return (
            <div>
                <Branding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={ 4 }>
                            <Informer />
                        </Grid.Column>

                        <Grid.Column width={ 12 }>

                            <Header as='h1'>
                                { t('model.lexicon.title') }
                            </Header>

                            <CurrentModelName name={ name } />

                            <Message content={ t('model.lexicon.description') } />

                            <Button as={ Link } to={ urls.gui.model.settings } >
                                { t('model.lexicon.nextButton') }
                            </Button>

                            <Divider />

                            <Segment>
                                <pre>
                                    { lexicon }
                                </pre>
                            </Segment>

                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lexicon: state.model.lexicon,
        name: state.model.name,
    }
}

const mapDispatchToProps = dispatch => ({
    modelLexicon: () => {
        dispatch(modelLexicon());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate('common')(ModelLexicon));
