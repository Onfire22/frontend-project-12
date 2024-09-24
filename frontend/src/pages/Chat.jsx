import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import {
  fetchChannels,
  getChannel,
  handleDeleteChannel,
  handleRenameChannel,
} from '../store/slices/channelsSlice';
import { getMessage } from '../store/slices/messagesSlice';
import { openModal } from '../store/slices/modalsSlice';
import InputForm from '../components/InputForm';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import renderModal from '../helpers/renderModal';
import filterMessages from '../helpers/filterMessages';
import addModalIco from '../images/icons/add-modal.svg';

const socket = io();

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { name, id } = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector((state) => filterMessages(id, state.messages.messages));
  const modalName = useSelector((state) => state.modals.name);
  const messagesError = useSelector((state) => state.messages.errors);
  const channelsError = useSelector((state) => state.channels.errors);

  const handleMessage = (payload) => {
    dispatch(getMessage(payload));
  };

  const handleChannel = (payload) => {
    dispatch(getChannel(payload));
  };

  const handleDelete = (payload) => {
    dispatch(handleDeleteChannel(payload));
  };

  const handleRename = (payload) => {
    dispatch(handleRenameChannel(payload));
  };

  useEffect(() => {
    dispatch(fetchChannels());
    socket.on('newMessage', (payload) => {
      handleMessage(payload);
    });
    socket.on('newChannel', (payload) => {
      handleChannel(payload);
    });
    socket.on('removeChannel', (payload) => {
      handleDelete(payload);
    });
    socket.on('renameChannel', (payload) => {
      handleRename(payload);
    });
    return () => {
      socket.off('newMessage', handleMessage);
      socket.off('newChannel', handleChannel);
      socket.off('removeChannel', handleDelete);
      socket.off('renameChannel', handleRename);
    };
    // eslint-disable-next-line
  }, []);

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
            {!channelsError ? <Channels /> : t('errors.connectErr')}
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
              {!messagesError ? <Messages /> : t('errors.connection')}
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
