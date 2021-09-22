import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

function VoteListMain() {
  const [redirectTo, setRedirectTo] = useState(false);
  useEffect(() => {
    setRedirectTo(true);
  }, []);

  if (redirectTo) {
    return <Redirect to="/vote/official" />;
  }

  return <div> </div>;
}

export default VoteListMain;
