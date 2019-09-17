import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Formik, ErrorMessage } from 'formik';
import { modelNew } from 'redux/actions';
import Branding from 'components/Steps/Shared/Branding';
import Informer from 'components/Steps/Shared/Informer';
import NewForm from 'components/Steps/Model/NewForm';


class ModelNew extends Component {

    render() {
        const { t, name, modelNew } = this.props;
        return (
            <div>
                <Branding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={ 4 }>
                            <Informer />
                        </Grid.Column>

                        <Grid.Column width={ 12 }>
                            <Header as='h1' text="true">
                                { t('model.new.title') }
                            </Header>

                            <NewForm />

                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        )
    }
}


export default translate('common')(ModelNew)
