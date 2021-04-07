import { useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

import {
  AttachFile,
  AttachFileOutlined,
  Cancel,
  InsertEmoticonRounded,
} from '@material-ui/icons';

const InputContainer = ({ ScrollToBottom }) => {
  const [input, setInput] = useState('');
  const [showRecipient, setShowRecipient] = useState(false);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

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
    ScrollToBottom();
  };

  return (
    <InputContainer>
      <InsertEmoticonRounded />
      <Picker onEmojiClick={onEmojiClick} className='emojiPicker' />
      <Input value={input} onChange={handleChange} />
      <button hidden disabled={!input} type='submit' onClick={sendMessage}>
        Send Message
      </button>
      <AttachFileOutlined />
    </InputContainer>
  );
};

export default InputContainer;

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
