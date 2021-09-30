import React from 'react';
import { Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import * as S from '../style';
import color from '../../../../util/style/color';

function VoteDate({ watch, control, register }) {
  const startDate = watch('startDate');
  const check = watch('startRightAway');
  console.log(startDate);
  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  const filterEndDateTime = time => {
    const selectedStart = new Date(startDate);
    const selectedDate = new Date(time);
    if (selectedStart.getDate() === selectedDate.getDate()) {
      return selectedStart.getTime() < selectedDate.getTime();
    }
    return selectedDate;
  };

  return (
    <DateContainer>
      <DateItem>
        <S.LabelColumn>투표 시작일</S.LabelColumn>
        {!check && (
          <Controller
            control={control}
            name="startDate"
            defaultValue=""
            render={({ field }) => (
              <StyledDatePicker
                onChange={e => field.onChange(e)}
                selected={field.value}
                showTimeInput
                minDate={new Date()}
                filterTime={filterPassedTime}
                dateFormat="yyyy.MM.dd HH:mm"
                placeholderText="YYYY.MM.dd HH:mm"
              />
            )}
          />
        )}
        <CheckBoxWrapper>
          <input
            type="checkbox"
            value="1"
            {...register('startRightAway')}
            style={{ transform: 'scale(1.3)', marginLeft: '10px' }}
          />
          <Text>바로 만들기</Text>
        </CheckBoxWrapper>
      </DateItem>
      <DateItem>
        <S.LabelColumn>투표 마감일</S.LabelColumn>
        <Controller
          control={control}
          name="endDate"
          defaultValue=""
          render={({ field }) => (
            <StyledDatePicker
              onChange={e => field.onChange(e)}
              selected={field.value}
              showTimeInput
              minDate={startDate}
              dateFormat="yyyy.MM.dd HH:mm"
              placeholderText="YYYY.MM.dd HH:mm"
              filterTime={filterEndDateTime}
            />
          )}
        />
      </DateItem>
    </DateContainer>
  );
}

const DateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 5vh 0;
`;
const DateItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 46%;
`;
const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #c2c2c2;
  :focus {
    outline: none;
  }
  color: #838383;
  font-size: 0.8rem;
  height: 28px;
  width: 100%;
    height: 45px;
  :: placeholder {
    font-family: 'sans-serif';
    font-weight:
    color: '#838383';
    font-size: 0.8rem;
    padding-left: 7px;
  }
  border-radius: 4px;
  border: 1px solid #c2c2c2;
  :focus {
    outline: none;
  }
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vh;
`;
const Text = styled.div`
  font-size: 1rem;
  margin-left: 2vw;
  color: ${color.gray};
`;

export default VoteDate;
