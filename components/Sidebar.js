import styled from 'styled-components';
import { Avatar, IconButton, Button } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

const sidebar = () => {
  const createChat = () => {
    const input = prompt(
      'Please enter an email for the user you want to chat with',
    );

    if (!input) return;
  };

  return (
    <Container>
      <Header>
        <UserAvatar />

        <IconContainer>
          <IconButton>
            <ChatIcon />
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

      {/* List of chats */}
    </Container>
  );
};

export default sidebar;

const Container = styled.div``;

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
  background-color: 0;
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

const IconContainer = styled.div``;
