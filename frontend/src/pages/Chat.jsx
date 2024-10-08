import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../store/slices/modalsSlice';
import InputForm from '../components/InputForm';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import renderModal from '../helpers/renderModal';
import filterMessages from '../helpers/filterMessages';
import { useFetchMessagesQuery, messagesApi } from '../store/api/messagesApi';
import { channelsApi } from '../store/api/channelsApi';
import addModalIco from '../images/icons/add-modal.svg';

const Chat = ({ socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { name, id } = useSelector((state) => state.channels.activeChannel);
  const { data = [], isError } = useFetchMessagesQuery();
  const messages = filterMessages(id, data);
  const modalName = useSelector((state) => state.modals.name);

  const createMessage = useCallback((payload) => {
    dispatch(messagesApi.util.updateQueryData('fetchMessages', undefined, (draft) => {
      draft.push(payload);
    }));
  }, [dispatch]);

  const createChannel = useCallback((payload) => {
    dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draft) => {
      draft.push(payload);
    }));
  }, [dispatch]);

  const removeChannel = useCallback((payload) => {
    dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draft) => {
      draft.push(payload);
    }));
  }, [dispatch]);

  const removeMessage = useCallback((payload) => {
    dispatch(messagesApi.util.updateQueryData('fetchMessages', undefined, (draft) => (
      draft.filter((message) => message.id !== payload.id)
    )));
  }, [dispatch]);

  const renameMessage = useCallback((payload) => {
    dispatch(messagesApi.util.updateQueryData('fetchMessages', undefined, (draft) => (
      draft.map((message) => {
        if (payload.id === message.id) {
          const newMessage = {
            ...message,
            text: payload.body,
          };
          return newMessage;
        }
        return message;
      })
    )));
  }, [dispatch]);

  const renameChannel = useCallback((payload) => {
    dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draft) => (
      draft.map((channel) => {
        if (payload.id === channel.id) {
          const newChannel = {
            ...channel,
            name: payload.name,
          };
          return newChannel;
        }
        return channel;
      })
    )));
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      createMessage(payload);
    });
    socket.on('removeMessage', (payload) => {
      removeMessage(payload);
    });
    socket.on('renameMessage', (payload) => {
      renameMessage(payload);
    });
    socket.on('newChannel', (payload) => {
      createChannel(payload);
    });
    socket.on('removeChannel', (payload) => {
      removeChannel(payload);
    });
    socket.on('renameChannel', (payload) => {
      renameChannel(payload);
    });
    return () => {
      socket.off('newMessage', createMessage);
      socket.off('removeMessage', removeMessage);
      socket.off('renameMessage', renameMessage);
      socket.off('newChannel', createChannel);
      socket.off('removeChannel', removeChannel);
      socket.off('renameChannel', renameChannel);
    };
  }, [
    createChannel,
    removeChannel,
    renameChannel,
    createMessage,
    removeMessage,
    renameMessage,
    socket,
  ]);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('chat.channels')}</b>
              <button
                className="p-0 text-primary btn btn-group-vertical"
                type="button"
                onClick={() => dispatch(openModal({ name: 'add' }))}
              >
                <img src={addModalIco} alt="add svg" />
                <span className="visually-hidden">+</span>
              </button>
            </div>
            {!isError ? <Channels /> : t('errors.connectErr')}
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    {`# ${name}`}
                  </b>
                </p>
                <span className="text-muted">{t('chat.messages.message', { count: messages.length })}</span>
              </div>
              {!isError ? <Messages /> : t('errors.connection')}
              <div className="mt-auto px-5 py-3">
                <InputForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModal(modalName)}
    </>
  );
};

export default Chat;
