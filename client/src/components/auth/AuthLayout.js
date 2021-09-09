import React from 'react';
import styled from 'styled-components';
import color from '../../util/style/color';

function AuthLayout({ title, description, children }) {
  return (
    <Container>
      <Header>
        <h1>{title}</h1>
        <Text>{description}</Text>
      </Header>
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 13vh 0px;
`;
const Header = styled.div`
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-size: 1.6rem;
  text-align: center;
  line-height: 1.7;
`;
const Text = styled.div`
  font-size: 1rem;
  color: ${color.darkGray};
`;

export default AuthLayout;
