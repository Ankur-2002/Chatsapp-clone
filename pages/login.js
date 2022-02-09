import { Button } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { provider, auth } from '../Firebase';
import { signInWithPopup } from 'firebase/auth';
const login = () => {
  const sign = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result);
      })
      .catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://i0.wp.com/www.smartparent.in/wp-content/uploads/2018/06/Whatsapp-Icon.png" />
        <ButtonContainer onClick={sign}>Sign in with Google</ButtonContainer>
      </LoginContainer>
    </Container>
  );
};

export default login;
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;

  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 50px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 10px;
`;
const ButtonContainer = styled(Button)`
  font-weight: bold !important;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
