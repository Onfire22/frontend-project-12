import { useSelector } from 'react-redux';
import Channel from './Channel';
import Loader from './Loader';

const Channels = () => {
  const channels = useSelector((state) => state.channels.channels);
  const status = useSelector((state) => state.channels.status);

  return (
    status === 'pending'
      ? <Loader text="каналов" />
      : (
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
          {channels.map((channel) => (
            <Channel
              key={channel.id}
              channel={channel}
            />
          ))}
        </ul>
      )
  );
};

export default Channels;
