import styled from 'styled-components';

const HomeIntro = () => {
  return (
    <Container>
      <ImageWrapper>
        <img src='images/chat.png' alt='' srcset='' />
      </ImageWrapper>
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

const ImageWrapper = styled.div``;
