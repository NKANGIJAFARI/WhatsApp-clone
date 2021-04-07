const InputContainer = () => {
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
