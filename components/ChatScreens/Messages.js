import { useRef } from 'react';
import styled from 'styled-components';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';
import Message from '../Message';
import InputContainer from './InputContainer';

const Messages = ({ messages, user }) => {
  const endOfMessages = useRef(null);
  const router = useRouter();

  //This below func will help scroll whenever a message is sent or received
  const ScrollToBottom = () => {
    endOfMessages.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  //Referenced to the messages collection
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc'),
  );

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
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  return (
    <MessagesWrapper>
      <MessageContainer>
        {showMessages(endOfMessages)}
        <EndOfMessages ref={endOfMessages} />
      </MessageContainer>
      <InputWrap>
        <InputContainer user={user} endOfMessages={endOfMessages} />
      </InputWrap>
    </MessagesWrapper>
  );
};

export default Messages;

const MessagesWrapper = styled.div`
  flex: 1;
`;

const MessageContainer = styled.div`
  padding: 20px;
  padding-top: 83px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessages = styled.div`
  margin-bottom: 6px;
`;

const InputWrap = styled.div`
  position: sticky;
  z-index: 100;
  bottom: 0;
`;
