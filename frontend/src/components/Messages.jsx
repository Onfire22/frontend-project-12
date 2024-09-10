import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Message from './Message';
import { fetchMessages } from '../store/slices/messagesSlice';
import MessagesSpinner from './MessagesSpinner';
import filterMessages from '../helpers/filterMessagess';

const Messages = () => {
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector((state) => filterMessages(activeChannel, state.messages.messages));

  useEffect(() => {
    dispatch(fetchMessages());
    // eslint-disable-next-line
  }, []);

  return (
    messages.status === 'pending'
      ? <MessagesSpinner />
      : (
        <div className="chat-messages overflow-auto px-5" id="messages-box">
          {!!messages.length && messages.map((message) => {
            return <Message key={message.id} text={message.text} />;
          })}
        </div>
      )
  );
};

export default Messages;
