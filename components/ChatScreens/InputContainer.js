import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import firebase from 'firebase';
import { db } from '../../firebase';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

import {
  AttachFileOutlined,
  InsertEmoticonRounded,
  SendOutlined,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const InputContainer = ({ user }) => {
  const [input, setInput] = useState('');
  const [showEmojis, setShowEmojis] = useState();

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const router = useRouter();

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //Show or hide the emoji picker
  const handleShowEmoji = () => {
    console.log('clicked');
    setShowEmojis(!showEmojis);
  };

  const sendMessage = (e) => {
    //e.preventDefault();

    // This will update a user's last seen status
    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    //This functions adds a message to the database
    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput('');
    if (showEmojis) {
      setShowEmojis(false);
    }
  };

  const onEnterPress = (e) => {
    console.log(e);
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Container>
      <IconButton onClick={handleShowEmoji}>
        <InsertEmoticonRounded />
      </IconButton>

      <EmojiWrapper className={showEmojis ? 'active' : ''}>
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{ width: '45%', height: '60vh' }}
          className='emojiPicker'
        />
      </EmojiWrapper>

      <Input value={input} onChange={handleChange} onKeyDown={onEnterPress} />
      <button disabled={!input} type='submit' onClick={sendMessage}>
        <SendOutlined />
      </button>
    </Container>
  );
};

export default InputContainer;

const Container = styled.form`
  display: flex;
  align-items: center;
  background-color: white;

  padding: 6px 20px;
`;
const Input = styled.textarea`
  flex: 1;
  outline: 0;
  border: none;
  padding: 15px;
  background-color: whiteSmoke;
  margin-right: 15px;
  margin-left: 15px;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
`;

const EmojiWrapper = styled.div`
  display: none;
  position: absolute;
  bottom: -600px;
  left: 0;

  &.active {
    display: block;
    bottom: 75px;
  }
`;
