import Head from 'next/head';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatsApp clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Sidebar />
        <div>This is a chat</div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
