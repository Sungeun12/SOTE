import React from 'react';
import { useFormContext } from 'react-hook-form';
import VoteType from './voteInput/VoteType';
import Title from './voteInput/Title';
import Description from './voteInput/Description';
import VoteDate from './voteInput/VoteDate';
import SelectionType from './voteInput/SelectionType';

function ConnectForm() {
  const methods = useFormContext();
  return (
    <div>
      <VoteType {...methods} />
      <Title {...methods} />
      <Description {...methods} />
      <VoteDate {...methods} />
      <SelectionType {...methods} />
    </div>
  );
}

export default ConnectForm;
