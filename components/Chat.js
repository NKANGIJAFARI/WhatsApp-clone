import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user)),
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
      )}

      <p>{recipientEmail}</p>
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
