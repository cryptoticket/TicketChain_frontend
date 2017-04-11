import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getHeaders, getParams} from '../utils';
import {openNotification} from '../notification';
import {browserHistory} from 'react-router';

export const GET_TICKET_COUNT_PENDING = 'GET_TICKET_COUNT_PENDING';
export const GET_TICKET_COUNT_FULFILLED = 'GET_TICKET_COUNT_FULFILLED';
export const GET_TICKET_COUNT_REJECTED = 'GET_TICKET_COUNT_REJECTED';

export const CREATE_NEW_BATCH_PENDING = 'CREATE_NEW_BATCH_PENDING';
export const CREATE_NEW_BATCH_FULFILLED = 'CREATE_NEW_BATCH_FULFILLED';
export const CREATE_NEW_BATCH_REJECTED = 'CREATE_NEW_BATCH_REJECTED';

export const CREATE_NEW_CSV_PENDING = 'CREATE_NEW_CSV_PENDING';
export const CREATE_NEW_CSV_FULFILLED = 'CREATE_NEW_CSV_FULFILLED';
export const CREATE_NEW_CSV_REJECTED = 'CREATE_NEW_CSV_REJECTED';

export const GET_BATCH_PENDING = 'GET_BATCH_PENDING';
export const GET_BATCH_FULFILLED = 'GET_BATCH_FULFILLED';
export const GET_BATCH_REJECTED = 'GET_BATCH_REJECTED';

export const GET_TICKET_PENDING = 'GET_TICKET_PENDING';
export const GET_TICKET_FULFILLED = 'GET_TICKET_FULFILLED';
export const GET_TICKET_REJECTED = 'GET_TICKET_REJECTED';

export const GET_TICKETS_PENDING = 'GET_TICKETS_PENDING';
export const GET_TICKETS_FULFILLED = 'GET_TICKETS_FULFILLED';
export const GET_TICKETS_REJECTED = 'GET_TICKETS_REJECTED';

export const SELL_TICKET_PENDING = 'SELL_TICKET_PENDING';
export const SELL_TICKET_FULFILLED = 'SELL_TICKET_FULFILLED';
export const SELL_TICKET_REJECTED = 'SELL_TICKET_REJECTED';

export const CANCEL_TICKET_PENDING = 'CANCEL_TICKET_PENDING';
export const CANCEL_TICKET_FULFILLED = 'CANCEL_TICKET_FULFILLED';
export const CANCEL_TICKET_REJECTED = 'CANCEL_TICKET_REJECTED';

export const EDIT_TICKET_PENDING = 'EDIT_TICKET_PENDING';
export const EDIT_TICKET_FULFILLED = 'EDIT_TICKET_FULFILLED';
export const EDIT_TICKET_REJECTED = 'EDIT_TICKET_REJECTED';

export const HANDLE_TICKET = 'HANDLE_TICKET';

export const GET_ORGANIZERS_PENDING = 'GET_ORGANIZERS_PENDING';
export const GET_ORGANIZERS_FULFILLED = 'GET_ORGANIZERS_FULFILLED';
export const GET_ORGANIZERS_REJECTED = 'GET_ORGANIZERS_REJECTED';

export const GET_CSV_JOB_PENDING = 'GET_CSV_JOB_PENDING';
export const GET_CSV_JOB_FULFILLED = 'GET_CSV_JOB_FULFILLED';
export const GET_CSV_JOB_REJECTED = 'GET_CSV_JOB_REJECTED';

export const GET_STATS_PENDING = 'GET_STATS_PENDING';
export const GET_STATS_FULFILLED = 'GET_STATS_FULFILLED';
export const GET_STATS_REJECTED = 'GET_STATS_REJECTED';

export const GET_TICKETS_COUNT = 'GET_TICKETS_COUNT';

export const GET_ASYNC_TICKET_FULFILLED = 'GET_ASYNC_TICKET_FULFILLED';

export const GET_BASIC_INFO = 'GET_BASIC_INFO';

export default class BlankActions {

    getBasicInfo = (inn, batchId) => {
        let isError = false;
        return dispatch => {
            dispatch({type: `${GET_BASIC_INFO}_PENDING`});
            fetch(`${config.baseUrl}info`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: `${GET_BASIC_INFO}_REJECTED`});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: `${GET_BASIC_INFO}_FULFILLED`, payload: json});
                    } else {
                        dispatch({type: `${GET_BASIC_INFO}_REJECTED`});
                        openNotification('error', json);
                    }
                })
                .catch(e => {
                    dispatch({type: `${GET_BASIC_INFO}_REJECTED`});
                    openNotification('error', e);
                });
        };
    };

    getTicketCount = (data, callback) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_TICKET_COUNT_PENDING, payload: data});
            fetch(`${config.baseUrl}organizers/${data.inn}/new_tickets_by_num `,
                {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_TICKET_COUNT_REJECTED});
                    }
                    return response.json();
                })
                .catch(e => {
                    dispatch({type: GET_TICKET_COUNT_REJECTED});
                    openNotification('error', e);
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: GET_TICKET_COUNT_FULFILLED, payload: json});
                        if (callback) callback();
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    createNewBatch = (inn, data) => {
        let isError = false;
        return dispatch => {
            dispatch({type: CREATE_NEW_BATCH_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/batches`,
                {
                    method: 'POST',
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
                .catch(e => {
                    dispatch({type: CREATE_NEW_BATCH_REJECTED});
                    openNotification('error', e.toString());
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: CREATE_NEW_BATCH_FULFILLED, payload: json});
                        browserHistory.push(`organizers/${inn}/batches/${json.batch_id}`);
                    } else {
                        openNotification('error', `Бланк с номером ${json.collision} уже существует.`);
                    }
                });
        };
    };

    createNewCSV = (inn, data, isBlocking) => {
        let isError = false;
        const file = new FormData(data);
        file.append('file', data);
        return dispatch => {
            dispatch({type: CREATE_NEW_CSV_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/csv_jobs`,
                {
                    method: 'POST',
                    body: file
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: CREATE_NEW_CSV_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: CREATE_NEW_CSV_FULFILLED, payload: json});
                        browserHistory.push(`organizers/${inn}/csv_jobs/${json.job_id}${isBlocking ? '?blocking=1' : ''}`);
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getBatch = (inn, batchId) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_BATCH_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/batches/${batchId}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_BATCH_REJECTED});
                    }
                    if (response.status == 404) {
                        browserHistory.push(`*`);
                        openNotification('error', `Пакет ${batchId} не найден!`);
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        const promiseList = json.map(ticketId => dispatch(this.getTicketNotAsyncPromise(inn, ticketId)));
                        Promise.all(promiseList)
                            .then(result => {
                                const tickets = result.map(r => r.payload);
                                dispatch({type: GET_BATCH_FULFILLED, payload: tickets})
                            })
                            .catch(error => {
                                openNotification('error', error);
                            })
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getTicket = (inn, ticketId, isSearch) => {
        let isError = false;
        let id = ticketId.split(' ').join("");

        return dispatch => {
            dispatch({type: GET_TICKET_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${id}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_TICKET_REJECTED});

                        if (isSearch) {
                            openNotification('error', `Билет ${ticketId} не найден!`)
                        } else {
                            browserHistory.push(`*`);
                        }
                    }
                    if (response.status == 404) {
                        openNotification('error', `Билет ${ticketId} не найден!`);
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
                {
                    method: 'POST',
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
                        dispatch(this.getTicket(inn, ticket.id));
                    } else {
                        openNotification('error', json);
                    }
                })
                .catch(er => {
                    dispatch({type: SELL_TICKET_REJECTED});
                })

        };
    };

    cancelTicket = (inn, ticket) => {
        let isError = false;
        return dispatch => {
            dispatch({type: CANCEL_TICKET_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${ticket.id}/cancel`,
                {
                    method: 'POST',
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
                        dispatch(this.getTicket(inn, ticket.id));
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
                {
                    method: 'PUT',
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
                        dispatch(this.getTicket(inn, ticket.id))
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    handleTicket = (ticket) => {
        return {type: HANDLE_TICKET, payload: ticket};
    };

    getOrganizers = () => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_ORGANIZERS_PENDING});
            fetch(`${config.baseUrl}organizers`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_ORGANIZERS_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: GET_ORGANIZERS_FULFILLED, payload: json});
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getOrganizerByInnPromise = (inn) => {
        let isError = false;
        return (
            fetch(`${config.baseUrl}organizers/${inn}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        return {type: 'GET_ORGANIZER_FULFILLED', payload: json};
                    } else {
                        openNotification('error', json);
                    }
                })
        );
    };

    getOrganizerByInn = (inn) => {
        let isError = false;
        return dispatch => {
            fetch(`${config.baseUrl}organizers/${inn}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        return json;
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getCsvJobById = (inn, jobId, isPending, isBlocking) => {
        let isError = false;
        return dispatch => {
            if (isPending) dispatch({type: GET_CSV_JOB_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/csv_jobs/${jobId}${isBlocking ? '?blocking=1' : ''}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_CSV_JOB_REJECTED});
                        if (response.status == 404) {
                            browserHistory.push(`*`);
                        }
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: GET_CSV_JOB_FULFILLED, payload: json});
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getTicketNotAsyncPromise = (inn, ticketId) => {
        let isError = false;
        return (
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${ticketId}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        return {type: GET_TICKET_FULFILLED, payload: json};
                    } else {
                        openNotification('error', json);
                    }
                })
        );
    };

    getTicketPromise = (inn, ticketId) => {
        let isError = false;
        return dispatch => (
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${ticketId}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        dispatch({
                            type: GET_ASYNC_TICKET_FULFILLED,
                            payload: {serial_number: ticketId, state: 'Loading error'}
                        });
                        isError = true;
                    }
                    return response.json();
                })
                .then(json => {
                    if (isError) {
                        openNotification('error', json);
                    } else {
                        dispatch({type: GET_ASYNC_TICKET_FULFILLED, payload: json});
                    }
                })
                .catch(err => {
                    dispatch({type: GET_ASYNC_TICKET_FULFILLED, payload: {serial_number: ticketId, state: 'error'}});
                })
        );
    };

    getTickets = (inn, params = {page: 1, limit: 10}) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_TICKETS_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/tickets?${getParams(params)}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_TICKETS_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        json.map(ticketId => dispatch(this.getTicketPromise(inn, ticketId)));
                        // Promise.all(promiseList).then(result => {
                        //     const tickets = result.map(r => r.payload);
                        //
                        // });
                        dispatch({type: GET_TICKETS_FULFILLED});
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getTicketsCount = (inn, params = {}, callback) => {
        let isError = false;
        return dispatch => {
            dispatch({type: `${GET_TICKETS_COUNT}_PENDING`});
            fetch(`${config.baseUrl}organizers/${inn}/ticket_count?${getParams(params)}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: `${GET_TICKETS_COUNT}_REJECTED`});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: `${GET_TICKETS_COUNT}_FULFILLED`, payload: json});
                        if (callback) callback();
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getStats = (inn) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_STATS_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/stats`,
                {
                    method: 'GET',
                    headers: getHeaders()
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                        dispatch({type: GET_STATS_REJECTED});
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: GET_STATS_FULFILLED, payload: json});
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };
}
