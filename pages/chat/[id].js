import styled from 'styled-components';
import Head from 'next/head';
import sidebar from '../../components/Sidebar';

const Chat = () => {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
    </Container>
  );
};

const Container = styled.div``;

export default Chat;
