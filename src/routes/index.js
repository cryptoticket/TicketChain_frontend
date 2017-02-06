import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from '../components/component';
import NotFoundComponent from '../components/common/NotFoundComponent';


export const urls = {
    index: {
        path: '/'
    }
};

export default (
    <Route>
        <Route path={urls.index.path} component={BaseComponent} />
        <Route path="*" component={NotFoundComponent} />
    </Route>
);
