import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from '../components/BaseComponent';
import NotFoundComponent from '../components/common/NotFoundComponent';
import MainPage from '../components/main/MainPage';

import CreateBlanksPage from '../components/blank/CreateBlanksPage';
import OrganizerComponent from '../components/organizer/OrganizerComponent';
import OrganizersPage from '../components/organizer/OrganizersPage';
import TicketsComponent from '../components/organizer/tickets/TicketsComponent';
import BatchPage from '../components/organizer/batch/BatchPage';
import CsvJobsPage from '../components/organizer/csvJobs/CsvJobsPage';
import TicketPage from '../components/organizer/ticket/TicketPage';
import TicketsPage from '../components/organizer/tickets/TicketsPage';


export const urls = {
    index: {
        path: '/'
    },
    newTickets: {
        path: 'new_tickets'
    },
    organizers: {
        path: 'organizers',
        batches: {
            path: ':inn/batches/:id'
        },
        tickets: {
            path: ':inn/tickets',
            item: {
                path: ':id'
            }
        },
        csvJobs: {
            path: ':inn/csv_jobs/:jobId'
        },
    }
};

export default (
    <Route>
        <Route path={urls.index.path} component={BaseComponent}>
            <IndexRoute component={MainPage} />
            <Route path={urls.newTickets.path} component={CreateBlanksPage} />
            <Route path={urls.organizers.path} component={OrganizerComponent}>
                <IndexRoute component={OrganizersPage} />
                <Route path={urls.organizers.batches.path} component={BatchPage} />
                <Route path={urls.organizers.csvJobs.path} component={CsvJobsPage} />
                <Route path={urls.organizers.tickets.path} component={TicketsComponent} >
                    <IndexRoute component={TicketsPage} />
                    <Route path={urls.organizers.tickets.item.path} component={TicketPage} />
                </Route>
            </Route>
        </Route>
        <Route path="*" component={NotFoundComponent} />
    </Route>
);
