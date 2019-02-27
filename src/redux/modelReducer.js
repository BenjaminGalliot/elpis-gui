const toyLexicon = `!SIL sil
<UNK> spn
di d I
kaai k a: I
amakaang a m a k a: ŋ
hada h a d a
muila m u I l a
`;

const initState = {
    modelList: [],
    name: '',
    dataBundleName: '',
    date: null,
    l2s: '',
    lexicon: '',
    settings: {
        ngram: 1
    },
    status: 'ready',
    apiWaiting: {status: false, message: 'something'}
}

const model = (state = initState, action) => {
    switch (action.type) {

        case 'TRIGGER_API_WAITING':
            return {
                ...state,
                apiWaiting: {status: true, message: action.message}
            }


        case 'MODEL_LIST':
            console.log("reducer got model list", action.response.data)
            return {
                ...state,
                modelList: action.response.data.data
            }

        case 'MODEL_LOAD':
        case 'MODEL_NEW':
            console.log("reducer got model new or load", action.response.data)
            return {
                ...state,
                name: action.response.data.data.config.name,
                l2s: action.response.data.data.l2s,
                dataBundleName: action.response.data.data.config.dataset_name,
                settings: {...state.settings, ngram: action.response.data.data.config.ngram}
            }

        case 'MODEL_NAME':
            console.log("reducer got model name", action.response.data)
            return {
                    ...state,
                    name: action.response.data.data.name
                }

        case 'MODEL_L2S':
            console.log("reducer got l2s", action)
            return {
                ...state,
                l2s: action.response.data
            }

        case 'MODEL_LEXICON':
            console.log("reducer got lexicon", action.response.data)
            return {
                ...state,
                lexicon: action.response.data
            }

        case 'MODEL_SETTINGS':
            return {
                ...state,
                settings: action.response.data
            }

        case 'MODEL_TRAIN':
            return {
                ...state,
                status: action.response.data.data
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