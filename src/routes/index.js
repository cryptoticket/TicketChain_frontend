import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from '../components/BaseComponent';
import NotFoundComponent from '../components/common/NotFoundComponent';

import CreateBlanksPage from '../components/blank/CreateBlanksPage';
import OrganizerComponent from '../components/organizer/OrganizerComponent';
import BatchPage from '../components/organizer/batch/BatchPage';
import TicketPage from '../components/organizer/ticket/TicketPage';


export const urls = {
    index: {
        path: '/'
    },
    newTickets: {
        path: 'new_tickets'
    },
    organizers: {
        batches: {
            path: 'organizers/:inn/batches/:id'
        },
        tickets: {
            path: 'organizers/:inn/tickets/:id'
        }
    }
};

export default (
    <Route>
        <Route path={urls.index.path} component={BaseComponent}>
            <Route path={urls.newTickets.path} component={CreateBlanksPage} />
            <Route path={urls.organizers.batches.path} component={BatchPage} />
            <Route path={urls.organizers.tickets.path} component={TicketPage} />
        </Route>
        <Route path="*" component={NotFoundComponent} />
    </Route>
);
