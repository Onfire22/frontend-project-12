import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Message from './Message';
import Loader from './Loader';
import filterMessages from '../helpers/filterMessages';
import { useFetchMessagesQuery } from '../store/api/messagesApi';
import { getMessages } from '../store/slices/messagesSlice';

const Messages = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.channels.activeChannel);
  const { data = [], isLoading } = useFetchMessagesQuery();
  const messages = filterMessages(id, data);

  useEffect(() => {
    dispatch(getMessages(data));
    // eslint-disable-next-line
  }, []);

  return (
    isLoading
      ? <Loader text="сообщений" />
      : (
        <div className="chat-messages overflow-auto px-5" id="messages-box">
          {messages.map((message) => (
            <Message key={message.id} text={message.text} author={message.author} />
          ))}
        </div>
      )
  );
};

export default Messages;
