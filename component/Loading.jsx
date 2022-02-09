import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  top: 0,
  left: 0,
  right: 0,
  position: 'absolute',
  bottom: 0,
  margin: 'auto',
  animation: ` spin  1s infinite steps(10)`,
};
const Loading = () => {
  return (
    <Container
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      <PrograssContainer
        style={{
          height: '150px',
          width: '150px',
          position: 'relative',
        }}
      >
        <img
          src={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png'
          }
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            margin: 'auto',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          alt="loading"
        />
        <Circle
          style={{
            ...LoaderStyle,
            borderTop: '5px solid #78ffd6',
          }}
          className="circle"
        ></Circle>
        <Circle1
          style={{
            ...LoaderStyle,
            borderRight: '5px solid #dff9fb',
          }}
          className="circle1"
        ></Circle1>
        <Circle2
          className="circle2"
          style={{
            ...LoaderStyle,
            borderBottom: '5px solid #a8ff78',
          }}
        ></Circle2>
      </PrograssContainer>
    </Container>
  );
};

export default Loading;
const Container = styled.div``;

const PrograssContainer = styled.div``;
const Circle1 = styled.div``;
const Circle2 = styled.div``;
const Circle = styled.div``;
