import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFetchChannelsQuery } from '../store/api/channelsApi';
import { getChannels } from '../store/slices/channelsSlice';
import Channel from './Channel';
import Loader from './Loader';

const Channels = () => {
  const dispatch = useDispatch();
  const { data = [], isLoading } = useFetchChannelsQuery();

  useEffect(() => {
    dispatch(getChannels(data));
    // eslint-disable-next-line
  }, []);

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
