import { useRef, useState } from 'react';
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
  const [showRecipient, setShowRecipient] = useState(false);

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

  return (
    <Container>
      <HeaderWrap>
        <Header
          showRecipientInfo={showRecipientInfo}
          recipient={recipient}
          user={user}
          recipientEmail={recipientEmail}
          recipientSnapshot={recipientSnapshot}
        />
      </HeaderWrap>

      <Messages messages={messages} />
      {/* ScrollToBottom={ScrollToBottom} */}
      <InputContainer user={user} />
      <RecipientDetails
        showRecipient={showRecipient}
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
  flex-direction: column;
`;

const HeaderWrap = styled.div`
  z-index: 100;
  position: sticky;
  top: 0;
`;

const MessagesWrap = styled.div``;
