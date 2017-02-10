import objectAssign from 'object-assign';

import {
    CREATE_NEW_BATCH,
    GET_BATCH
} from '../../actions/blank';

const initialState = {
    isFetching: false,
    batch: []
};

import reducersGenerate from '../reducersGenerate';

export default reducersGenerate([CREATE_NEW_BATCH, GET_BATCH], initialState, {
    'CREATE_NEW_BATCH_PENDING': (state) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    'CREATE_NEW_BATCH_FULFILLED': (state, action) => {
        return Object.assign({}, state, {
            isFetching: false,
            batchId: action.payload.batch_id
        });
    },
    'CREATE_NEW_BATCH_REJECTED': (state, action) => {
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.payload
        });
    },
    'GET_BATCH_PENDING': (state) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    'GET_BATCH_FULFILLED': (state, action) => {
        return Object.assign({}, state, {
            isFetching: false,
            batch: action.payload
        });
    },
    'GET_BATCH_REJECTED': (state, action) => {
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.payload
        });
    }
});

