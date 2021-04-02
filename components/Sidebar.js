import React from 'react';
import styled from 'styled-components';

const sidebar = () => {
  return (
    <Container>
      <Haeder>Header</Haeder>
    </Container>
  );
};

export default sidebar;

const Container = styled.div``;

const Header = styled.div``;

const UserAvatar = styled(Avatar);
