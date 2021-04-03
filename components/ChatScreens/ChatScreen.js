import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../../firebase';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  AttachFile,
  AttachFileOutlined,
  InsertEmoticonRounded,
} from '@material-ui/icons';

const ChatScreen = ({ chat, messages }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc'),
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={mesage.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Avatar></Avatar>

        <HeaderInformation>
          <h3>Recip email</h3>
          <p>Last seen</p>
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
        {/* {showMessages()} */}

        <EndOfMessages />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonRounded />
        <Input />
        <AttachFileOutlined />
      </InputContainer>
    </Container>
  );
};
export default ChatScreen;

const Container = styled.div``;

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
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: grey;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessages = styled.div``;

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
