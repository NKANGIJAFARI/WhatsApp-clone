import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';

const RecipientDetails = ({ showRecipientInfo, recipientEmail, recipient }) => {
  return (
    <Container className={showRecipient ? 'active' : ''}>
      <Wrapper>
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
      </Wrapper>
    </Container>
  );
};

export default RecipientDetails;

const Container = styled.div`
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

const Wrapper = styled.div`
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
