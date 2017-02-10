import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getHeaders} from '../utils';
import {openNotification} from '../notification';
import { browserHistory } from 'react-router';
import { urls } from '../../routes';

export const CREATE_NEW_BATCH = 'CREATE_NEW_BATCH';
export const GET_BATCH = 'GET_BATCH';

export default class BlankActions {

    createNewBatch = (inn, data) => {
        let isError = false;
        return dispatch => {
            fetch(`${config.baseUrl}organizer/${inn}/batch`,
                { method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.status >= 400) {
                        isError = true;
                    }
                    return response.json();
                })
                .then(json => {
                    if (!isError) {
                        dispatch({type: CREATE_NEW_BATCH, payload: json});
                        browserHistory.push(urls.index.path);
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };

    getBatch = (inn,batchId) => {
        let isError = false;
        return dispatch => {
            fetch(`${config.baseUrl}organizer/${inn}/batch/${batchId}`,
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
                        dispatch({type: GET_BATCH, payload: json});
                    } else {
                        openNotification('error', json);
                    }
                });
        };
    };
}
