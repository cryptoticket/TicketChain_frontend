import objectAssign from 'object-assign';

import {
    TEST_ACTION
} from '../actions';

const initialState = {
    testState: true
};

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case TEST_ACTION:
            return objectAssign({}, state);
        default:
            return state;
    }
}

export default mainReducer;
