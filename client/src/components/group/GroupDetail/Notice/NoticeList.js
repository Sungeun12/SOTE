import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';
import color from '../../../../util/style/color';

function NoticeList({ data, id }) {
  const history = useHistory();
  const columns = ['번호', '제목', '글쓴이', '날짜'];
  return (
    <Table>
      <Thead>
        <tr>
          {columns.map(column => (
            <TheadText key={column}>{column}</TheadText>
          ))}
        </tr>
      </Thead>
      <tbody>
        {data.map(({ _id, title, writer, createdAt }, index) => (
          <NoticeItem
            key={_id}
            index={index}
            onClick={() => history.push(`/group/${id}/notice/${_id}`)}
          >
            <td>{index + 1}</td>
            <td>{title}</td>
            <td>{writer.name}</td>
            <td>{moment(createdAt).format('YY.MM.DD')}</td>
          </NoticeItem>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
`;
const Thead = styled.thead`
  height: 6vh;
  line-height: 6vh;
  border-top: 1px solid ${color.middleGray};
  border-bottom: 1px solid ${color.middleGray};
`;
const TheadText = styled.th`
  font-size: 1rem;
  font-weight: bold;
  color: ${color.gray};
`;
const NoticeItem = styled.tr`
  text-align: center;
  height: 6vh;
  line-height: 6vh;
  border-bottom: 1px solid ${color.middleGray};
  cursor: pointer;
  background: ${props => props.index % 2 === 0 && `${color.lightGray}`};
`;
export default NoticeList;
