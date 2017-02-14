import {
    CREATE_NEW_BATCH_PENDING,
    CREATE_NEW_BATCH_FULFILLED,
    CREATE_NEW_BATCH_REJECTED,
    GET_BATCH_PENDING,
    GET_BATCH_FULFILLED,
    GET_BATCH_REJECTED,
    GET_TICKET_PENDING,
    GET_TICKET_FULFILLED,
    GET_TICKET_REJECTED,
    SELL_TICKET_PENDING,
    SELL_TICKET_FULFILLED,
    SELL_TICKET_REJECTED,
    CANCEL_TICKET_PENDING,
    CANCEL_TICKET_FULFILLED,
    CANCEL_TICKET_REJECTED,
    EDIT_TICKET_PENDING,
    EDIT_TICKET_FULFILLED,
    EDIT_TICKET_REJECTED,
    HANDLE_TICKET,
    GET_ORGANIZERS_PENDING,
    GET_ORGANIZERS_FULFILLED,
    GET_ORGANIZERS_REJECTED,
    GET_TICKETS_PENDING,
    GET_TICKETS_FULFILLED,
    GET_TICKETS_REJECTED
} from '../../actions/blank';

const initialState = {
    isFetching: false,
    batch: [],
    organizers: [],
    tickets: [],
    ticket: {}
};

function blankReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_NEW_BATCH_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case CREATE_NEW_BATCH_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                batchId: action.payload.batch_id
            });
        }
        case CREATE_NEW_BATCH_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case GET_BATCH_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_BATCH_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                batch: action.payload
            });
        }
        case GET_BATCH_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case GET_TICKET_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_TICKET_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                ticket: action.payload
            });
        }
        case GET_TICKET_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case SELL_TICKET_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case SELL_TICKET_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case CANCEL_TICKET_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case CANCEL_TICKET_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case EDIT_TICKET_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case EDIT_TICKET_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        case HANDLE_TICKET: {
            return Object.assign({}, state, {
                ticket: action.payload
            });
        }
        case GET_ORGANIZERS_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_ORGANIZERS_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                organizers: action.payload
            });
        }
        case GET_ORGANIZERS_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }

        case GET_TICKETS_PENDING: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case GET_TICKETS_FULFILLED: {
            return Object.assign({}, state, {
                isFetching: false,
                tickets: action.payload
            });
        }
        case GET_TICKETS_REJECTED: {
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload
            });
        }
        default:
            return state;
    }
}

export default blankReducer;