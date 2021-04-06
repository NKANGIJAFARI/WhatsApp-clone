import styled from 'styled-components';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreens/ChatScreen';
import { db, auth } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Main>
        <Head>
          <title>Chat with {getRecipientEmail(chat.users, user)}</title>
        </Head>
        <Sidebar />
        <ChatContainer>
          <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
      </Main>
    </Container>
  );
};
export default Chat;

export const getServerSideProps = async (context) => {
  const ref = db.collection('chats').doc(context.query.id);

  //PREP THE MESSAGES ON THE SERVER
  const messagesRef = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //Prepare the  chats on the server

  const chatRef = await ref.get();
  const chat = {
    id: chatRef.id,
    ...chatRef.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  display: flex;
  max-width: 1250px;
`;

const ChatContainer = styled.div`
  width: 60%;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;
