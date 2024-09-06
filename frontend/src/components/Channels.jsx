import { useSelector } from 'react-redux';
import Channel from './Channel';

const Channels = () => {
  const channels = useSelector((state) => state.channels.channels);

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
      {!!channels.length && channels.map(({ name, id }) => {
        return <Channel key={id} name={name} />;
      })}
    </ul>
  );
};

export default Channels;
