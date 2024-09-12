import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { fetchChannels, getChannel } from '../store/slices/channelsSlice';
import { getMessage } from '../store/slices/messagesSlice';
import { toggleModal } from '../store/slices/modalsSlice';
import InputForm from '../components/InputForm';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import filterMessages from '../helpers/filterMessages';
import AddModal from '../components/AddModal';

export const socket = io();

const Chat = () => {
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector((state) => filterMessages(activeChannel, state.messages.messages));
  const modalShow = useSelector((state) => state.modals.show);

  const handleMessage = (payload) => {
    dispatch(getMessage(payload));
  };

  const handleChannel = (payload) => {
    dispatch(getChannel(payload));
  };

  useEffect(() => {
    dispatch(fetchChannels());
    socket.on('newMessage', (payload) => {
      handleMessage(payload);
    });
    socket.on('newChannel', (payload) => {
      handleChannel(payload);
    });
    return () => {
      socket.off('newMessage', handleMessage);
      socket.off('newChannel', handleChannel);
    };
    // eslint-disable-next-line
  }, []);

  // toDo MODALS!!!

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button className="p-0 text-primary btn btn-group-vertical" type="button" onClick={() => dispatch(toggleModal())}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </button>
            </div>
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    #
                    {activeChannel}
                  </b>
                </p>
                <span className="text-muted">{`${messages.length} сообщений`}</span>
              </div>
              <Messages />
              <div className="mt-auto px-5 py-3">
                <InputForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalShow && <AddModal show={modalShow} toggleModal={toggleModal} />}
    </>
  );
};

export default Chat;
