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

const RecipientDetailsWrapper = styled.div`
  min-width: 300px;
  display: none;
  transition: display 0.9s;
  height: 100vh;
  overflow: hidden;

  &.active {
    display: block;
    height: 100vh;
    overflow-y: hidden;
    position: sticky;
    top: 0;
  }
`;

const RecipientDetails = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 30px;
  background-color: whiteSmoke;

  & .details__avatar {
    width: 150px;
    height: 150px;
  }
`;

const CancelIcon = styled(Cancel)`
  &&& {
    font-size: 2.5rem;
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
  }
`;

const EndOfMessages = styled.div`
  margin-bottom: 6px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  position: sticky;
  background-color: white;
  z-index: 100;
  bottom: 0;
  padding: 0px 20px;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  padding: 15px;
  background-color: whiteSmoke;
  margin-right: 15px;
  margin-left: 15px;
  border-radius: 10px;
`;
