import Head from 'next/head';
import styled from 'styled-components';
import HomeIntro from '../components/HomeIntro';

import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <Container>
      <Main>
        <Head>
          <title>WhatsApp clone</title>
          <link rel='icon' href='/chat.svg' />
        </Head>

        <Wrapper>
          <Sidebar />
          <HomeIntro />
        </Wrapper>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  width: 100%;
  max-width: 1200px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
