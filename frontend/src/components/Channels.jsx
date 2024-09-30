import { useTranslation } from 'react-i18next';
import { useFetchChannelsQuery } from '../store/api/channelsApi';
import Channel from './Channel';
import Loader from './Loader';

const Channels = () => {
  const { data = [], isLoading } = useFetchChannelsQuery();
  const { t } = useTranslation();

  return (
    isLoading
      ? <Loader translate={t} text={t('loader.channels')} />
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
