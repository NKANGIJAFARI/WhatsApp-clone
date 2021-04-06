import Head from 'next/head';
import styled from 'styled-components';
import HomeIntro from '../components/HomeIntro';

import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>WhatsApp clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Wrapper>
        <Sidebar />
        <HomeIntro />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
