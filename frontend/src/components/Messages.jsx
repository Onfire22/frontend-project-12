import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Message from './Message';
import { fetchMessages } from '../store/slices/messagesSlice';
import Loader from './Loader';
import filterMessages from '../helpers/filterMessages';

const Messages = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.channels.activeChannel);
  const status = useSelector((state) => state.messages.status);
  const messages = useSelector((state) => filterMessages(id, state.messages.messages));

  useEffect(() => {
    dispatch(fetchMessages());
    // eslint-disable-next-line
  }, []);

  return (
    status === 'pending'
      ? <Loader text="сообщений" />
      : (
        <div className="chat-messages overflow-auto px-5" id="messages-box">
          {!!messages.length && messages.map((message) => {
            return <Message key={message.id} text={message.text} author={message.author} />;
          })}
        </div>
      )
  );
};

export default Messages;
