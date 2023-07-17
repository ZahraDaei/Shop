import React, { Component } from 'react';
import { Route } from 'react-router';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import AppLayout from './AppLayout';



export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
                <Route path="/" component={AppLayout}/>
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </>
        );
    }
}
