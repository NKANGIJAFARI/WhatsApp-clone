import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../../firebase';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  AttachFile,
  AttachFileOutlined,
  Cancel,
  InsertEmoticonRounded,
} from '@material-ui/icons';
import Message from '../Message';
import getRecipientEmail from '../../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

const ChatScreen = ({ chat, messages }) => {
  const [input, setInput] = useState('');
  const [showRecipient, setShowRecipient] = useState(false);

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

  //This below func will help scroll whenever a message is sent or received
  const ScrollToBottom = () => {
    endOfMessages.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const showMessages = () => {
    if (messagesSnapshot) {
      ScrollToBottom();
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      // ScrollToBottom();
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

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
      <MessagesWrapper>
        <Header>
          <HeaderInformation onClick={showRecipientInfo}>
            <HeaderAvatar>
              {recipient ? (
                <Avatar src={recipient?.photoURL}></Avatar>
              ) : (
                <Avatar src={recipientEmail[0]}></Avatar>
              )}
            </HeaderAvatar>
            <HeaderInfoText>
              <h3>{recipient?.displayName}</h3>
              {recipientSnapshot ? (
                <p>
                  Last Seen:{' '}
                  {recipient?.lastSeen?.toDate() ? (
                    <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                  ) : (
                    'Account Not Found'
                  )}
                </p>
              ) : (
                <p>Loading last ative</p>
              )}
            </HeaderInfoText>
          </HeaderInformation>

          <HeaderIcons>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </HeaderIcons>
        </Header>

        <MessageContainer>
          {showMessages()}
          <EndOfMessages ref={endOfMessages} />
        </MessageContainer>

        <InputContainer>
          <InsertEmoticonRounded />
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button hidden disabled={!input} type='submit' onClick={sendMessage}>
            Send Message
          </button>
          <AttachFileOutlined />
        </InputContainer>
      </MessagesWrapper>

      <RecipientDetailsWrapper className={showRecipient ? 'active' : ''}>
        <RecipientDetails>
          <CancelIcon onClick={showRecipientInfo} />
          {recipient ? (
            <Avatar
              src={recipient?.photoURL}
              className='details__avatar'></Avatar>
          ) : (
            <Avatar src={recipientEmail[0]}></Avatar>
          )}

          <p>{recipient ? recipient.displayName : 'Account not found'}</p>
          <p>{recipient ? recipient.email : ''}</p>
        </RecipientDetails>
      </RecipientDetailsWrapper>
    </Container>
  );
};
export default ChatScreen;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  height: 80px;
  padding: 0px 20px;
  cursor: pointer;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderInfoText = styled.div`
  > h3 {
    margin: 0;
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: grey;
    margin: 0;
  }
`;

const HeaderAvatar = styled.div`
  margin-right: 15px;
`;

const HeaderIcons = styled.div``;

const MessagesWrapper = styled.div`
  flex: 1;
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
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
  margin-bottom: 50px;
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
