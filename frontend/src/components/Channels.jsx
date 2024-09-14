import { useSelector } from 'react-redux';
import Channel from './Channel';
import Loader from './Loader';

const Channels = () => {
  const channels = useSelector((state) => state.channels);

  return (
    channels.status === 'pending'
      ? <Loader text="каналов" />
      : (
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
          {!!channels.channels.length && channels.channels.map((channel) => {
            return (
              <Channel
                key={channel.id}
                channel={channel}
              />
            );
          })}
        </ul>
      )
  );
};

export default Channels;
