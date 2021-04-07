import { useRef } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../../firebase';

import Message from '../Message';
import getRecipientEmail from '../../utils/getRecipientEmail';

const ChatScreen = ({ chat, messages }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const endOfMessages = useRef(null);

  //Get the email of the recipient
  const recipientEmail = getRecipientEmail(chat.users, user);

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

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const sendMessage = (e) => {
    e.preventDefault();

    // This will update a user's last seen status
    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    //This functions adds a message to the database
    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput('');
    ScrollToBottom();
  };

  //Get recipient information

  const showRecipientInfo = () => {
    setShowRecipient(!showRecipient);
  };

  return (
    <Container>
      <Header showRecipient={showRecipient} />
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
