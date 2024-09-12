import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { setActive } from '../store/slices/channelsSlice';

const Channel = ({ name }) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.channels.activeChannel);

  return (
    <li className="nav-item w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          variant={active === name ? 'secondary' : 'light'}
          type="button"
          onClick={() => dispatch(setActive(name))}
        >
          {name}
        </Button>
        <Dropdown.Toggle
          split
          variant={active === name ? 'secondary' : 'light'}
          id="dropdown-split-basic"
        />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
