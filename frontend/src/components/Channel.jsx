import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../store/slices/channelsSlice';

const Channel = ({ name, removable }) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.channels.activeChannel);

  const btnActiveClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': active === name,
  });

  const btnEditClass = cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', 'btn', {
    'btn-secondary': active === name,
  });

  return (
    <li className="nav-item w-100">
      <div className="d-flex dropdown btn-group" role="group">
        <button className={btnActiveClass} type="button" onClick={() => dispatch(setActive(name))}>
          <span className="me-1">#</span>
          {name}
        </button>
        {
          removable && (
          <button
            className={btnEditClass}
            type="button"
            id="react-aria2952926309-:r0:"
            aria-expanded="false"
          >
            <span className="visually-hidden">
              Управление каналом
            </span>
          </button>
          )
        }
      </div>
    </li>
  );
};

export default Channel;
