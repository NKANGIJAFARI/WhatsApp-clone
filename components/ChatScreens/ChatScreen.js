import { useRef } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../../firebase';

import getRecipientEmail from '../../utils/getRecipientEmail';
import InputContainer from './InputContainer';
import Messages from './Messages';
import RecipientDetails from './RecipientDetails';
import Header from './Header';

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  const endOfMessages = useRef(null);

  const recipientEmail = getRecipientEmail(chat.users, user);

  //Referenced to the user collection to get a recipient data
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', recipientEmail),
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  //Get recipient information
  const showRecipientInfo = () => {
    setShowRecipient(!showRecipient);
  };

  //This below func will help scroll whenever a message is sent or received
  const ScrollToBottom = () => {
    endOfMessages.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <Container>
      <Header
        showRecipientInfo={showRecipientInfo}
        recipient={recipient}
        user={user}
        recipientEmail={recipientEmail}
        recipientSnapshot={recipientSnapshot}
      />
      <InputContainer ScrollToBottom={ScrollToBottom} />
      <Messages ScrollToBottom={ScrollToBottom} />
      <RecipientDetails
        showRecipientInfo={showRecipientInfo}
        recipientEmail={recipientEmail}
        recipient={recipient}
      />
    </Container>
  );
};
export default ChatScreen;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
