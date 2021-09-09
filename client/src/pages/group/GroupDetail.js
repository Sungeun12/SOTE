import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadIdGroup } from '../../actions/group_actions';

import Home from '../../components/group/GroupDetail/Home';
import Notice from '../../components/group/GroupDetail/Notice';
import GroupDetailLayout from '../../components/group/GroupDetail/GroupDetailLayout';
import GroupVote from '../../components/group/GroupDetail/GroupVote';
import Member from '../../components/group/GroupDetail/Member';
import Manage from '../../components/group/GroupDetail/Manage';
import NoticeDetail from '../../components/group/GroupDetail/Notice/NoticeDetail/index';

function GroupDetail({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  useEffect(() => {
    dispatch(loadIdGroup(id));
  }, [dispatch, id]);

  return (
    <div>
      <GroupDetailLayout id={id}>
        <Switch>
          <Route exact path={`/group/${id}/home`}>
            <Home id={id} />
          </Route>
          <Route exact path={`/group/${id}/notice`}>
            <Notice id={id} />
          </Route>
          <Route exact path={`/group/${id}/notice/:uid`} component={NoticeDetail} />
          <Route exact path={`/group/${id}/vote`} component={GroupVote} />
          <Route exact path={`/group/${id}/member`} component={Member} />
          <Route exact path={`/group/${id}/manage`} component={Manage} />
        </Switch>
      </GroupDetailLayout>
    </div>
  );
}

export default GroupDetail;
