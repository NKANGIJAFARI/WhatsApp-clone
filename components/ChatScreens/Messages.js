const Messages = () => {
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
