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

const InputContainer = () => {
  const [input, setInput] = useState('');
  const [showRecipient, setShowRecipient] = useState(false);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
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
