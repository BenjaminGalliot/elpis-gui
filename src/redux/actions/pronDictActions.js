import axios from 'axios'
import urls from 'urls'

import * as actionTypes from '../actionTypes/pronDictActionTypes';

const baseUrl = (process.env.REACT_APP_BASEURL) ? process.env.REACT_APP_BASEURL : 'http://'+window.location.host

/* * * * * * * * * * * *  NEW * * * * * * * * * * *  */

// make new pronDict, then change url to add files page
export function pronDictNew(postData) {
    const url = baseUrl + urls.api.pronDict.new
    return async dispatch => {
        dispatch(pronDictNewStarted())
        await axios.post(url, postData)
            .then( response => {
                dispatch(pronDictNewSuccess(response))
            })
            .catch( error => {
                dispatch(pronDictNewFailure(error))
                throw error
            })
        return "Made a new pronDict OK"
    }
}

const pronDictNewStarted = () => ({
    type: actionTypes.PRON_DICT_NEW_STARTED
})
const pronDictNewSuccess = response => ({
    type: actionTypes.PRON_DICT_NEW_SUCCESS,
    payload: { ...response }
})
const pronDictNewFailure = error => ({
    type: actionTypes.PRON_DICT_NEW_FAILURE,
    payload: { error }
})


/* * * * * * * * * * * *  LOAD * * * * * * * * * * *  */


export function pronDictLoad(postData) {
    const url = baseUrl + urls.api.pronDict.load
    return async dispatch => {
        dispatch(pronDictLoadStarted())
        await axios.post(url, postData)
            .then(response => {
                dispatch(pronDictLoadSuccess(response))
            })
            .catch(error => {
                dispatch(pronDictLoadFailure(error))
                throw error
            })
        return "Loaded a pronDict OK"
    }
}

const pronDictLoadStarted = () => ({
    type: actionTypes.PRON_DICT_LOAD_STARTED
})
const pronDictLoadSuccess = response => ({
    type: actionTypes.PRON_DICT_LOAD_SUCCESS,
    payload: { ...response }
})
const pronDictLoadFailure = error => ({
    type: actionTypes.PRON_DICT_LOAD_FAILURE,
    payload: { error }
})



/* * * * * * * * * * * *  LIST * * * * * * * * * * *  */

export function pronDictList() {
    const url = baseUrl + urls.api.pronDict.list
    return async dispatch => {
        dispatch(pronDictListStarted())
        await axios.post(url)
            .then(response => {
                dispatch(pronDictListSuccess(response))
            })
            .catch(error => {
                dispatch(pronDictListFailure(error))
                throw error
            })
        return "Listed a pronDict OK"
    }
}

const pronDictListStarted = () => ({
    type: actionTypes.PRON_DICT_LIST_STARTED
})
const pronDictListSuccess = response => ({
    type: actionTypes.PRON_DICT_LIST_SUCCESS,
    payload: { ...response }
})
const pronDictListFailure = error => ({
    type: actionTypes.PRON_DICT_LIST_FAILURE,
    payload: { error }
})
