import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from '../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('header.title')}</a>
        {
          token && <button type="button" className="btn btn-primary" onClick={() => dispatch(logOut())}>{t('header.logout')}</button>
        }
      </div>
    </nav>
  );
};

export default Header;
