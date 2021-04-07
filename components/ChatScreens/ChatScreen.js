import { useRef } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../../firebase';

import Message from '../Message';
import getRecipientEmail from '../../utils/getRecipientEmail';
import InputContainer from './InputContainer';

const ChatScreen = ({ chat, messages }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const endOfMessages = useRef(null);

  //Referenced to the messages collection
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc'),
  );

  //Referenced to the user collection to get a recipient data
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', recipientEmail),
  );

  const recipientEmail = getRecipientEmail(chat.users, user);

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  //Get recipient information

  const showRecipientInfo = () => {
    setShowRecipient(!showRecipient);
  };

  return (
    <Container>
      <Header
        showRecipient={showRecipientInfo}
        recipient={recipient}
        user={user}
        recipientEmail={recipientEmail}
      />
      {/* <InputContainer ScrollToBottom={ScrollToBottom} /> */}
    </Container>
  );
};
export default ChatScreen;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const EndOfMessages = styled.div`
  margin-bottom: 6px;
`;
