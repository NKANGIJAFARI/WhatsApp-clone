import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

const Chat = ({ id, users }) => {
  return (
    <Container>
      <UserAvatar />
      <p>Name of user</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 0px 20px 0px 20px;
`;

export default Chat;
