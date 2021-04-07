import Head from 'next/head';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { QuestionAnswer } from '@material-ui/icons';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>Login</Head>
      <LoginContainer>
        <ChatLogo />
        <Button variant='outlined' onClick={signIn}>
          Sign In with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whiteSmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px -3px rgba(0, 0, 0, 0.7);
`;

const ChatLogo = styled(QuestionAnswer)`
  color: #3cbc28;
  width: 100px;
  margin-bottom: 30px;
  &&& {
    font-size: 100px;
  }
`;

export default Login;
