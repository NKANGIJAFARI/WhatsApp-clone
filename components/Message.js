import styled from 'styled-components';

const Message = ({ user, message }) => {
  console.log(message);
  console.log(message.message);

  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
};

export default Message;

const Container = styled.div``;
