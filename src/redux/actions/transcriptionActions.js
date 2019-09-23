import axios from 'axios'
import urls from 'urls'

import * as actionTypes from '../actionTypes/transcriptionActionTypes';

const baseUrl = (process.env.REACT_APP_BASEURL) ? process.env.REACT_APP_BASEURL : 'http://'+window.location.host

/* * * * * * * * * * * *  NEW * * * * * * * * * * *  */

export function transcriptionNew(postData) {
    const url = baseUrl + urls.api.transcription.new
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    return async dispatch => {
        dispatch(transcriptionNewStarted())
        await axios.post(url, postData, config)
            .then( response => {
                console.log("transcriptionNew action response", response)
                dispatch(transcriptionNewSuccess(response))
            })
            .catch( error => {
                dispatch(transcriptionNewFailure(error))
                throw error
            })
        return "Made a new transcription OK"
    }
}

const transcriptionNewStarted = () => ({
    type: actionTypes.TRANSCRIPTION_NEW_STARTED
})
const transcriptionNewSuccess = response => ({
    type: actionTypes.TRANSCRIPTION_NEW_SUCCESS,
    payload: { ...response }
})
const transcriptionNewFailure = error => ({
    type: actionTypes.TRANSCRIPTION_NEW_FAILURE,
    payload: { error }
})

