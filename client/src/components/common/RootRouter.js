import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AppLayout from './AppLayout';
import Main from '../../pages/Main';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import CreateVote from '../../pages/CreateVote';
import AuthConfirm from '../../pages/AuthConfirm';
import GroupList from '../../pages/group/GroupList';
import GroupDetail from '../../pages/group/GroupDetail';
import CreateGroup from '../../pages/group/CreateGroup';

function LoginRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/createvote" component={CreateVote} />
      <Route exact path="/group" component={GroupList} />
      <Route exact path="/group/:id" component={GroupDetail} />
      <Route exact path="/creategroup" component={CreateGroup} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

function HomeRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/auth" component={AuthConfirm} />
      <Redirect from="*" to="/login" />
    </Switch>
  );
}

function RootRouter({ isLogin }) {
  return (
    <Router>
      <Switch>
        {isLogin ? (
          <AppLayout>
            <LoginRoutes />
          </AppLayout>
        ) : (
          <AppLayout>
            <HomeRoutes />
          </AppLayout>
        )}
      </Switch>
    </Router>
  );
}

export default RootRouter;
