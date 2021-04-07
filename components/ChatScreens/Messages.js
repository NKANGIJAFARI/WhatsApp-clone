import styled from 'styled-components';
const Messages = () => {
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
