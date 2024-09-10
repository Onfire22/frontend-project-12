import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../store/slices/channelsSlice';

const Channel = ({
  name,
  id,
}) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.channels.activeChannel);

  const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-primary': active === id,
  });

  return (
    <li className="nav-item w-100">
      <button className={btnClass} type="button" onClick={() => dispatch(setActive(id))}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default Channel;
