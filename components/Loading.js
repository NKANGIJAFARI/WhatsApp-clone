import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Circle } from 'better-react-spinkit';
import styled from 'styled-components';

const Loading = () => {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <ChatLogo />
      <Circle color='#76C3B1' size={60} />
    </center>
  );
};

const ChatLogo = styled(QuestionAnswerIcon)`
  &&& {
    color: #3cbc28;
    margin-bottom: 30px;
    width: 130px;
    height: 130px;
    font-size: 130px;
  }
`;

export default Loading;
