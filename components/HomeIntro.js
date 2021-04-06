import styled from 'styled-components';
import Image from 'next/image';

const HomeIntro = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image
          src='/chat.png'
          alt='Picture of the author'
          width={400}
          height={300}
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
`;

const ImageWrapper = styled.div`
  width: 80%;
  height: 60vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
