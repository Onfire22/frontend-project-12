import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Message from './Message';
import Loader from './Loader';
import filterMessages from '../helpers/filterMessages';
import { useFetchMessagesQuery } from '../store/api/messagesApi';

const Messages = () => {
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.channels.activeChannel);
  const { data = [], isLoading } = useFetchMessagesQuery();
  const messages = filterMessages(id, data);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current?.lastElementChild) {
      messagesRef.current.lastElementChild.scrollIntoView({ block: 'end' });
    }
  }, [messages]);

  return (
    isLoading
      ? <Loader translate={t} text={t('loader.messages')} />
      : (
        <div className="chat-messages overflow-auto px-5" id="messages-box" ref={messagesRef}>
          {messages.map((message) => (
            <Message key={message.id} text={message.text} author={message.author} />
          ))}
        </div>
      )
  );
};

export default Messages;
