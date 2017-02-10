import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from '../components/BaseComponent';
import NotFoundComponent from '../components/common/NotFoundComponent';

import CreateBlanksPage from '../components/blank/CreateBlanksPage';


export const urls = {
    index: {
        path: '/'
    },
    newTickets: {
        path: 'new_tickets'
    }
};

export default (
    <Route>
        <Route path={urls.index.path} component={BaseComponent}>
            <Route path={urls.newTickets.path} component={CreateBlanksPage} />
        </Route>
        <Route path="*" component={NotFoundComponent} />
    </Route>
);
