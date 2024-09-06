import { useSelector } from 'react-redux';
import Message from './Message';

const Messages = () => {
  const messages = useSelector((state) => state.messages.messages);

  return (
    <div className="chat-messages overflow-auto px-5" id="messages-box">
      {!!messages.length && messages.map((message) => {
        return <Message key={message.id} text={message.text} />;
      })}
    </div>
  );
};

export default Messages;
