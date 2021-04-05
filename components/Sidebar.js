import { useState } from 'react';

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
  const [userLoggedIn] = useAuthState(auth);

  const [searching, setSearching] = useState(false);

  //Get whats typed in to search users
  // const [searchInput, setSearchInput] = useState('');

  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', userLoggedIn?.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  //It prompt for user to enter email they want to chat with
  const createChat = () => {
    const input = prompt(
      'Please enter an email for the user you want to chat with',
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !checkIfChatExists(input) &&
      input !== userLoggedIn.email
    ) {
      //If the chat doesnt exist and the email is valid, go on and save that chat
      db.collection('chats').add({
        users: [userLoggedIn.email, input],
      });
    }
  };

  const checkIfChatExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((user) => user === recipientEmail?.length > 0),
    );
  /* use !! to make the return a bolean, its default return
     will be an element but we need a bolean */
  let chatsFiltered = [];
  const searchUsers = (searchInput) => {
    chatsFiltered = chatsSnapshot?.docs.filter(
      (chat) =>
        chat.data().users[0].includes(searchInput) ||
        chat.data().users[1].includes(searchInput),
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar
          src={userLoggedIn?.photoURL}
          onClick={() => auth.signOut()}
        />

        <IconContainer>
          <IconButton className='StartChat__btn' onClick={createChat}>
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
        <SearchInput
          placeholder='Search in chats'
          onChange={(e) => {
            searchUsers(e.target.value);
            e.target.value ? setSearching(true) : setSearching(false);
          }}
        />
      </Search>
      {searching
        ? chatsFiltered.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
          ))
        : chatsSnapshot?.docs.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
          ))}

      {/* {chatsSnapshot?.docs.map((chat) =>
        recipientsArray?.map(
          (recipient) =>
            chat.data().users.includes(recipient) &&
            (recipient.includes(chat.data().users[0]) ||
            recipient.includes(chat.data().users[1]) ? (
             
            ) : (
              ''
            )),
        ),
      )} */}
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
  z-index: 100;
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
