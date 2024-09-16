import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {
          token && <button type="button" className="btn btn-primary" onClick={() => dispatch(logOut())}>Выйти</button>
        }
      </div>
    </nav>
  );
};

export default Header;
