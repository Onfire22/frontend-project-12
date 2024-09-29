import { useFetchChannelsQuery } from '../store/api/channelsApi';
import Channel from './Channel';
import Loader from './Loader';

const Channels = () => {
  const { data = [], isLoading } = useFetchChannelsQuery();

  return (
    isLoading
      ? <Loader text="каналов" />
      : (
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
          {data.map((channel) => (
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
