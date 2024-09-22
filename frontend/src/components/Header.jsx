import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logOut } from '../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('header.title')}</Link>
        {
          token && <button type="button" className="btn btn-primary" onClick={() => dispatch(logOut())}>{t('header.logout')}</button>
        }
      </div>
    </nav>
  );
};

export default Header;
