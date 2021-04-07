import styled from 'styled-components';

const Messages = ({ ScrollToBottom }) => {
  const endOfMessages = useRef(null);

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

  return (
    <MessagesWrapper>
      <MessageContainer>
        {showMessages()}
        <EndOfMessages ref={endOfMessages} />
      </MessageContainer>
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
