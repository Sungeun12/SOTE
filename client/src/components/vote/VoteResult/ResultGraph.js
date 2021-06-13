import React from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import styled from 'styled-components';

function ResultGraph({ data }) {
  return (
    <Container>
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 50,
            right: 10,
            left: 10,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray=" 3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
`;
export default ResultGraph;
