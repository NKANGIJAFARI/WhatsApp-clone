import Head from 'next/head';
import styled from 'styled-components';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Button } from '@material-ui/core';
const Login = () => {
  return (
    <Container>
      <Head>Login</Head>
      <LoginContainer>
        <ChatLogo />
        <Button variant='outlined'>Sign In with Google</Button>
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
`;

const ChatLogo = styled(WhatsAppIcon)`
  color: green;
  width: 100px;

  &&& {
    font-size: 100px;
  }
`;

export default Login;
