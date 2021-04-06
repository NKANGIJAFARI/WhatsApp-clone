import styled from 'styled-components';
import Image from 'next/image';

const HomeIntro = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image
          src='/chat.svg'
          alt='Picture of the author'
          width={350}
          height={250}
        />
      </ImageWrapper>
      <DetailsContainer>
        <h2>Stay Connected, Feel together</h2>
        <p>
          Through a fast and secure chat system, we assist you keep up with your
          loved ones
        </p>
      </DetailsContainer>
    </Container>
  );
};

export default HomeIntro;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const ImageWrapper = styled.div`
  width: 80%;
  height: 60vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > img {
    border-radius: 100%;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > p {
    margin: 0px;
  }
`;
