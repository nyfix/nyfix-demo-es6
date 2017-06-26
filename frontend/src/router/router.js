/*************************************************************************
 * ULLINK CONFIDENTIAL INFORMATION
 * _______________________________
 *
 * All Rights Reserved.
 *
 * NOTICE: This file and its content are the property of Ullink. The
 * information included has been classified as Confidential and may
 * not be copied, modified, distributed, or otherwise disseminated, in
 * whole or part, without the express written permission of Ullink.
 ************************************************************************/

import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from 'ui/container/App';
import Home from 'ui/container/Home';
import PrivatePage from 'ui/container/PrivatePage';
import AccountPage from 'ui/container/AccountPage';
import LoginPage from 'ui/container/LoginPage';
import privateRoute from 'router/privateRoute';

export default (onLogout) => (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={Home}/>
    <Route path="private" component={privateRoute(PrivatePage)}/>
    <Route path="login" component={LoginPage}/>
    <Route path="settings/logout" onEnter={onLogout}/>
    <Route path="settings/account" component={privateRoute(AccountPage)}/>
  </Route>
);
