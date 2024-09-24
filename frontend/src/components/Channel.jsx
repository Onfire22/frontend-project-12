import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { setActive } from '../store/slices/channelsSlice';
import { openModal } from '../store/slices/modalsSlice';

const Channel = ({ channel }) => {
  const { id, name, removable } = channel;
  const dispatch = useDispatch();
  const active = useSelector((state) => state.channels.activeChannel);

  return (
    <li className="nav-item w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          variant={active.name === name ? 'secondary' : 'light'}
          type="button"
          onClick={() => dispatch(setActive(channel))}
        >
          {`# ${name}`}
        </Button>
        {
          removable && (
            <Dropdown.Toggle
              className="dropdown-btn"
              split
              variant={active.name === name ? 'secondary' : 'light'}
              id="dropdown-split-basic"
            >
              <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>
          )
        }
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(openModal({ name: 'remove', id }))}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(openModal({ name: 'rename', id }))}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
