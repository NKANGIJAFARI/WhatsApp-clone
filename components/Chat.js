import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../utils/getRecipientEmail';

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);

  const recepientEmail = getRecipientEmail(users, user);

  console.log(user, users);
  return (
    <Container>
      <UserAvatar />
      <p>{recepientEmail}</p>
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
