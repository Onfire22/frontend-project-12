import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import axios from 'axios';
import { API_ROUTES } from '../routes/routes';
import { logIn } from '../store/slices/authSlice';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(API_ROUTES.login(), values);
        dispatch(logIn(response.data));
        navigate('/');
      } catch (e) {
        setError('Неверные имя пользователя или пароль');
      }
    },
  });

  const inputClass = cn('form-control', {
    'is-invalid': !!error,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('forms.loginTitle')}</h1>
      <div className="form-floating mb-3">
        <input
          className={inputClass}
          placeholder={t('forms.login')}
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputRef}
        />
        <label className="form-label" htmlFor="username">{t('forms.login')}</label>
      </div>
      <div className="form-floating mb-4">
        <input
          className={inputClass}
          placeholder={t('forms.password')}
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <label className="form-label" htmlFor="password">{t('forms.password')}</label>
        {error && <div className="invalid-tooltip">{error}</div>}
      </div>
      <button className="w-100 mb-3 btn btn-outline-primary" type="submit">{t('forms.enterBtn')}</button>
    </form>
  );
};

export default LoginForm;
