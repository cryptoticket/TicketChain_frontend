import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getHeaders} from '../utils';
import {openNotification} from '../notification';
import { browserHistory } from 'react-router';
import { urls } from '../../routes';

export const CREATE_NEW_BATCH_PENDING = 'CREATE_NEW_BATCH_PENDING';
export const CREATE_NEW_BATCH_FULFILLED = 'CREATE_NEW_BATCH_FULFILLED';
export const CREATE_NEW_BATCH_REJECTED = 'CREATE_NEW_BATCH_REJECTED';

export const GET_BATCH_PENDING = 'GET_BATCH_PENDING';
export const GET_BATCH_FULFILLED = 'GET_BATCH_FULFILLED';
export const GET_BATCH_REJECTED = 'GET_BATCH_REJECTED';

export const GET_TICKET_PENDING = 'GET_TICKET_PENDING';
export const GET_TICKET_FULFILLED = 'GET_TICKET_FULFILLED';
export const GET_TICKET_REJECTED = 'GET_TICKET_REJECTED';

export const SELL_TICKET_PENDING = 'SELL_TICKET_PENDING';
export const SELL_TICKET_FULFILLED = 'SELL_TICKET_FULFILLED';
export const SELL_TICKET_REJECTED = 'SELL_TICKET_REJECTED';

export const CANCEL_TICKET_PENDING = 'CANCEL_TICKET_PENDING';
export const CANCEL_TICKET_FULFILLED = 'CANCEL_TICKET_FULFILLED';
export const CANCEL_TICKET_REJECTED = 'CANCEL_TICKET_REJECTED';

export const EDIT_TICKET_PENDING = 'EDIT_TICKET_PENDING';
export const EDIT_TICKET_FULFILLED = 'EDIT_TICKET_FULFILLED';
export const EDIT_TICKET_REJECTED = 'EDIT_TICKET_REJECTED';


export default class BlankActions {

    createNewBatch = (inn, data) => {
        let isError = false;
        return dispatch => {
            dispatch({type: CREATE_NEW_BATCH_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/batches`,
                { method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: CREATE_NEW_BATCH_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: CREATE_NEW_BATCH_FULFILLED, payload: json});
                        browserHistory.push(`organizers/${inn}/batches/${json.batch_id}`);
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getBatch = (inn,batchId) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_BATCH_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/batches/${batchId}`,
                { method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_BATCH_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: GET_BATCH_FULFILLED, payload: json});
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getTicket = (inn,ticketId) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_TICKET_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${ticketId}`,
                { method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_TICKET_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: GET_TICKET_FULFILLED, payload: json});
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    sellTicket = (inn, ticket) => {
        let isError = false;
        return dispatch => {
            dispatch({type: SELL_TICKET_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${ticket.id}/sell`,
                { method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(ticket)
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: SELL_TICKET_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        this.getTicket(inn,ticket.id);
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    cancelTicket = (inn,ticket) => {
        let isError = false;
        return dispatch => {
            dispatch({type: CANCEL_TICKET_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${ticket.id}/cancel`,
                { method: 'POST',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: CANCEL_TICKET_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        this.getTicket(inn,ticket.id);
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    editTicket = (inn, ticket) => {
        let isError = false;
        return dispatch => {
            dispatch({type: EDIT_TICKET_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${ticket.id}`,
                { method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify(ticket)
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: EDIT_TICKET_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        this.getTicket(inn,ticket.id);
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };
}
