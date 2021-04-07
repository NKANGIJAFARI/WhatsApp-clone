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
