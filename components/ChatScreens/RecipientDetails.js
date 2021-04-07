const RecipientDetails = () => {
  return (
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
  );
};

export default RecipientDetails;
