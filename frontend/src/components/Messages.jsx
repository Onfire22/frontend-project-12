import { useSelector } from 'react-redux';
import Message from './Message';
import MessagesSpinner from './MessagesSpinner';

const Messages = () => {
  const messages = useSelector((state) => state.messages);
  return (
    messages.status === 'pending'
      ? <MessagesSpinner />
      : (
        <div className="chat-messages overflow-auto px-5" id="messages-box">
          {!!messages.messages.length && messages.messages.map((message) => {
            return <Message key={message.id} text={message.text} />;
          })}
        </div>
      )
  );
};

export default Messages;
