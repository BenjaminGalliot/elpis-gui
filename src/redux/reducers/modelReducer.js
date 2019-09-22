import * as actionTypes from '../actionTypes/modelActionTypes';

const initState = {
    modelList: [],
    name: '',
    datasetName: '',
    pronDictName: '',
    date: null,
    l2s: '',
    lexicon: '',
    results: null,
    settings: {
        ngram: 1
    },
    status: 'ready',
    apiWaiting: {status: false, message: 'something'}
}

const model = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.MODEL_NEW_SUCCESS:
            var { name } = action.payload.data.data.config
            return { ...initState, name }

        case actionTypes.MODEL_LOAD_SUCCESS:
            var { config, l2s } = action.payload.data.data
            return {
                ...state,
                name: config.name,
                l2s,
                status: 'ready',
                lexicon: 'No lexicon yet',
                datasetName: config.dataset_name,
                pronDictName: config.pron_dict_name,
                settings: {...state.settings, ngram: config.ngram}
            }


        case 'MODEL_LIST':
            return {
                ...state,
                modelList: action.response.data.data
            }

        case 'MODEL_L2S':
            return {
                ...state,
                l2s: action.response.data
            }

        case 'MODEL_LEXICON':
            return {
                ...state,
                lexicon: action.response.data
            }

        case 'MODEL_SETTINGS':
            return {
                ...state,
                settings: action.response.data.data
            }

        case 'MODEL_TRAIN':
            return {
                ...state,
                status: action.response.data.data
            }

        case 'MODEL_RESULTS':
            return {
                ...state,
                results: action.response.data.data
            }

        case 'MODEL_STATUS':
            return {
                ...state,
                status: action.response.data.data
            }

        default:
            return state;
    }
}

export default model;