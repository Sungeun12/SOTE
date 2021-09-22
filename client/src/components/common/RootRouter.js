import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AppLayout from './AppLayout';
import Main from '../../pages/Main';
import Login from '../../pages/auth/Login';
import SignUp from '../../pages/auth/SignUp';
import CreateVote from '../../pages/vote/CreateVote';
import AuthConfirm from '../../pages/auth/AuthConfirm';
import GroupList from '../../pages/group/GroupList';
import GroupDetail from '../../pages/group/GroupDetail';
import CreateGroup from '../../pages/group/CreateGroup';
import VoteList from '../../pages/vote/VoteList';
import VoteDetail from '../../pages/vote/VoteDetail';
import VoteResult from '../../pages/vote/VoteResult';
import Profile from '../../pages/mypage/Profile';
import VoteListMain from '../../pages/vote/VoteListMain';
import MyVote from '../../pages/mypage/MyVote';
import MyGroup from '../../pages/mypage/MyGroup';
import Collections from '../../pages/mypage/Collections';
import Search from '../../pages/search/Search';

function LoginRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/createvote" component={CreateVote} />
      <Route exact path="/vote/:category/:id" component={VoteDetail} />
      <Route exact path="/vote/:category/:id/closed" component={VoteResult} />
      <Route exact path="/vote/:category" component={VoteList} />
      <Route exact path="/vote" component={VoteListMain} />
      <Route exact path="/group" component={GroupList} />
      <Route exact path="/group/:id/:tab" component={GroupDetail} />
      <Route exact path="/group/:id/:tab/:uid" component={GroupDetail} />
      <Route exact path="/creategroup" component={CreateGroup} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/myvote/:category" component={MyVote} />
      <Route exact path="/mygroup" component={MyGroup} />
      <Route exact path="/collections" component={Collections} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/signup" component={SignUp} />
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
