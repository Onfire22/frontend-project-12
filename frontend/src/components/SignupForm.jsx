import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSignUpValidation } from '../hooks/validateHooks';
import { API_ROUTES } from '../routes/routes';
import { logIn } from '../store/slices/authSlice';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const schema = useSignUpValidation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values) => {
      const { username, password } = values;
      axios.post(API_ROUTES.signup(), { username, password })
        .then((data) => {
          localStorage.setItem('token', JSON.stringify(data.token));
          dispatch(logIn(values));
          navigate('/');
        })
        .catch((e) => {
          if (e.code) {
            formik.errors.confirmPassword = 'uniq';
          } else {
            formik.errors = e;
          }
        });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('forms.signupTitle')}</h1>
      <FloatingLabel className="mb-3" controlId="username" label={t('forms.signupLogin')}>
        <Form.Control
          type="text"
          placeholder="От 3 до 20 символов"
          name="username"
          autoComplete="username"
          required
          isInvalid={formik.errors.username}
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputRef}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">{formik.errors.username}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel className="mb-3" controlId="password" label={t('forms.password')}>
        <Form.Control
          type="password"
          placeholder="Не менее 6 символов"
          name="password"
          autoComplete="password"
          required
          isInvalid={formik.errors.password}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">{formik.errors.password}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel className="mb-4" controlId="confirmPassword" label={t('forms.passwordConfirm')}>
        <Form.Control
          type="password"
          placeholder="Пароли должны совпадать"
          name="confirmPassword"
          autoComplete="new-password"
          required
          isInvalid={formik.errors.confirmPassword}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">{formik.errors.confirmPassword}</Form.Control.Feedback>
      </FloatingLabel>
      <Button
        className="w-100"
        variant="outline-primary"
        type="submit"
      >
        {t('forms.signUp')}
      </Button>
    </Form>
  );
};

export default SignupForm;
