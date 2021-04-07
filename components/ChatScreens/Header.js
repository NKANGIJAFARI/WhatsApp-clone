import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile } from '@material-ui/icons';

const Header = () => {
  return (
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
  );
};

export default Header;

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
