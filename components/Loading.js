import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Circle } from 'better-react-spinkit';
import styled from 'styled-components';

const Loading = () => {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <ChatLogo />
        <Circle color='#3cbc28' size={60} />
      </div>
    </center>
  );
};

const ChatLogo = styled(WhatsAppIcon)`
  &&& {
    color: #3cbc28;
    margin-bottom: 30px;
    width: 130px;
    height: 130px;
    font-size: 130px;
  }
`;

export default Loading;
