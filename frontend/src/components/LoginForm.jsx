import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { API_ROUTES, ROUTES } from '../routes/routes';
import { logIn } from '../store/slices/authSlice';

const LoginForm = () => {
  const [error, setError] = useState('');
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
        navigate(ROUTES.chat);
      } catch (e) {
        setError(t('forms.errors.wrongData'));
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('forms.loginTitle')}</h1>
      <FloatingLabel className="mb-3" controlId="username" label={t('forms.login')}>
        <Form.Control
          type="text"
          placeholder="От 3 до 20 символов"
          name="username"
          autoComplete="username"
          required
          isInvalid={error}
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputRef}
        />
      </FloatingLabel>
      <FloatingLabel className="mb-3" controlId="password" label={t('forms.password')}>
        <Form.Control
          type="password"
          placeholder="Не менее 6 символов"
          name="password"
          autoComplete="password"
          required
          isInvalid={error}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">{error}</Form.Control.Feedback>
      </FloatingLabel>
      <Button
        className="w-100 mb-3"
        variant="outline-primary"
        type="submit"
      >
        {t('forms.enterBtn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
