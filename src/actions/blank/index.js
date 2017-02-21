import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getHeaders} from '../utils';
import {openNotification} from '../notification';
import { browserHistory } from 'react-router';
import { urls } from '../../routes';

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


export default class BlankActions {

    getTicketCount = (data, callback) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_TICKET_COUNT_PENDING, payload: data});
            fetch(`${config.baseUrl}organizers/${data.inn}/calculate_ticket_count`,
                { method: 'POST',
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
                        openNotification('error', `Бланк с номером ${json.collision} уже существует.`);
                    }
                });
        };
    };

    createNewCSV = (inn, data) => {
        let isError = false;
        const file = new FormData(data);
        file.append('file', data);
        return dispatch => {
            dispatch({type: CREATE_NEW_CSV_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/csv_job`,
                { method: 'POST',
                    body: file,
                    mode: 'no-cors'

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
                        browserHistory.push(`organizers/${inn}/batches/${json.batch_id}`);
                    } else {
                        openNotification('error', `Бланк с номером ${json.collision} уже существует.`);
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
                        const promiseList = json.map(ticketId => dispatch(this.getTicketPromise(inn, ticketId)));
                        Promise.all(promiseList).then(result => {
                            const tickets = result.map(r => r.payload);
                            dispatch({type: GET_BATCH_FULFILLED, payload: tickets});
                        });
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getTicket = (inn, ticketId) => {
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
                        dispatch(this.getOrganizerByInnPromise(inn)).then(organizer =>{
                            const ticket = json;
                            ticket.organizer = organizer.payload.organizer;
                            ticket.organizer_inn = organizer.payload.organizer_inn;
                            ticket.organizer_ogrn = organizer.payload.organizer_ogrn;
                            ticket.organizer_ogrnip = organizer.payload.organizer_ogrnip;
                            ticket.organizer_address = organizer.payload.organizer_address;
                            dispatch({type: GET_TICKET_FULFILLED, payload: ticket});
                        })
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
                        dispatch(this.getTicket(inn,ticket.id));
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
                        dispatch(this.getTicket(inn,ticket.id));
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
                        dispatch(this.getTicket(inn,ticket.id))
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    handleTicket = (ticket) => {
        return { type: HANDLE_TICKET, payload: ticket };
    };

    getOrganizers = () => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_ORGANIZERS_PENDING});
            fetch(`${config.baseUrl}organizers`,
                { method: 'GET',
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
                        const promiseList = json.map(inn => dispatch(this.getOrganizerByInnPromise(inn)));
                        Promise.all(promiseList).then(result => {
                            const organizers = result.map(r => r.payload);
                            dispatch({type: GET_ORGANIZERS_FULFILLED, payload: organizers});
                        });
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
                { method: 'GET',
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
                { method: 'GET',
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

    getTicketPromise = (inn,ticketId) => {
        let isError = false;
        return (
            fetch(`${config.baseUrl}organizers/${inn}/tickets/${ticketId}`,
                { method: 'GET',
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

    getTickets = (inn) => {
        let isError = false;
        return dispatch => {
            dispatch({type: GET_TICKETS_PENDING});
            fetch(`${config.baseUrl}organizers/${inn}/tickets`,
                { method: 'GET',
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
                        const promiseList = json.map(ticketId => dispatch(this.getTicketPromise(inn, ticketId)));
                        Promise.all(promiseList).then(result => {
                            const tickets = result.map(r => r.payload);
                            dispatch({type: GET_TICKETS_FULFILLED, payload: tickets});
                        });
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };
}
