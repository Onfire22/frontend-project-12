import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { signUp } from '../store/slices/authSlice';
import { useSignUpValidation } from '../helpers/validateSchemas';

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
    onSubmit: (values) => {
      const { username, password } = values;
      schema.validate(values, { abortEarly: false })
        .then(() => {
          dispatch(signUp({ username, password }));
          navigate('/');
        })
        .catch((e) => {
          formik.errors = e;
        });
    },
  });

  // refactor to Form

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('forms.signupTitle')}</h1>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="От 3 до 20 символов"
          name="username"
          required
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputRef}
        />
        <label className="form-label" htmlFor="username">{t('forms.signupLogin')}</label>
        <div className="invalid-feedback">{formik.errors.username}</div>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="password"
          placeholder="Не менее 6 символов"
          name="password"
          aria-describedby="passwordHelpBlock"
          required
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <label className="form-label" htmlFor="password">{t('forms.password')}</label>
        <div className="invalid-feedback">{formik.errors.password}</div>
      </div>
      <div className="form-floating mb-4">
        <input
          className="form-control"
          type="password"
          name="confirmPassword"
          placeholder="Пароли должны совпадать"
          required
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <label className="form-label" htmlFor="confirmPassword">{t('forms.passwordConfirm')}</label>
        <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
      </div>
      <button className="w-100 btn btn-outline-primary" type="submit">{t('forms.signUp')}</button>
    </form>
  );
};

export default SignupForm;
