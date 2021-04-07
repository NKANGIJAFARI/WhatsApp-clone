const HeaderInformtion = () => {
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

export default HeaderInformtion;
