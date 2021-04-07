import styled from 'styled-components';

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
