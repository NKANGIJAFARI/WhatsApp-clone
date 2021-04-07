import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import firebase from 'firebase';
import { db } from '../../firebase';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

import { AttachFileOutlined, InsertEmoticonRounded } from '@material-ui/icons';

const InputContainer = ({ user }) => {
  const [input, setInput] = useState('');

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const router = useRouter();

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
    // ScrollToBottom();
  };

  return (
    <Container>
      <InsertEmoticonRounded />

      <EmojiWrapper>
        <Picker onEmojiClick={onEmojiClick} className='emojiPicker' />
      </EmojiWrapper>

      <Input value={input} onChange={handleChange} />
      <button hidden disabled={!input} type='submit' onClick={sendMessage}>
        Send Message
      </button>
      <AttachFileOutlined />
    </Container>
  );
};

export default InputContainer;

const Container = styled.form`
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

const EmojiWrapper = styled.div`
  display: none;
`;
