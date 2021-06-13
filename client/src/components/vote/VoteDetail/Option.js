import React from 'react';
import styled from 'styled-components';
import color from '../../../util/style/color';

function Option({ index, image, name, description }) {
  return (
    <OptionContainer>
      <TopWrapper>
        <Index>{index + 1}</Index>
        <ImageContainer>
          {image ? <Img src={`http://localhost:5000/${image}`} alt={image} /> : ''}
        </ImageContainer>
        <Name>{name}</Name>
      </TopWrapper>
      {description ? <DashedLine /> : ''}
      {description ? (
        <Description>
          {description.split('\n').map(line => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </Description>
      ) : (
        ''
      )}
      <Line />
    </OptionContainer>
  );
}

const OptionContainer = styled.div`
  width: 100%;
  font-family: 'Nanum Gothic Coding', monospace;
`;
const TopWrapper = styled.ul`
  display: flex;
  width: 100%;
  height: 200px;
`;
const Index = styled.li`
  width: 8%;
  font-size: 1.3rem;
  border: 2px solid ${color.navy};
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-right: 2vw;
`;
const ImageContainer = styled.li``;
const Img = styled.img`
  border-radius: 5px;
  width: 200px;
  height: 200px;
`;
const Name = styled.li`
  margin: auto 5vw;
  font-size: 1.3rem;
  position: relative;
`;
const Line = styled.div`
  margin: 3vh 0;
  width: 100%;
  border-bottom: 1px solid ${color.gray};
  opacity: 0.3;
`;
const DashedLine = styled.div`
  margin: 3vh 0;
  width: 100%;
  border-bottom: 1px dashed ${color.gray};
  opacity: 0.3;
`;
const Description = styled.div`
  text-align: center;
  font-family: 'Nanum Gothic', monospace;
  margin: 4vh 0;
`;

export default Option;
