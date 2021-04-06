import Head from 'next/head';
import styled from 'styled-components';
import HomeIntro from '../components/HomeIntro';

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
        <HomeIntro />
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
