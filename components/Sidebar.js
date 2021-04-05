import styled from 'styled-components';
import { Avatar, IconButton, Button } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import Chat from '../components/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user?.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      'Please enter an email for the user you want to chat with',
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !checkIfChatExists(input) &&
      input !== user.email
    ) {
      //If the chat doesnt exist and the email is valid, go on and save that chat
      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  };

  const checkIfChatExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((user) => user === recipientEmail?.length > 0),
    );
  /* use !! to make the return a bolean, its default return
     will be an element but we need a bolean */

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />

        <IconContainer>
          <IconButton className='StartChat__btn'>
            <ChatIcon />
            <StartNewChat>New Chat</StartNewChat>
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in chats' />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whiteSmoke;
  height: 100vh;
  min-height: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  scrollbar-width: none;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2px;
  padding: 20px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whiteSmoke;
    border-bottom: 1px solid whiteSmoke;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: whiteSmoke;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whiteSmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const StartNewChat = styled.p`
  position: absolute;
  top: 100%;
  left: -40px;
  border: 1px solid whiteSmoke;
  text-align: center;
  display: none;
  &&& {
    font-size: 16px;
    margin: 0;
    width: max-content;
  }
`;

const IconContainer = styled.div`
  & .StartChat__btn {
    position: relative;

    & > :hover p {
      display: block;
    }
  }
`;
