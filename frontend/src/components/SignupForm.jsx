import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
  const inputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="w-50">
      <h1 className="text-center mb-4">Регистрация</h1>
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
        <label className="form-label" htmlFor="username">Имя пользователя</label>
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
        <label className="form-label" htmlFor="password">Пароль</label>
      </div>
      <div className="form-floating mb-4">
        <input
          className="form-control"
          type="password"
          name="confirmPassword"
          required
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
      </div>
      <button className="w-100 btn btn-outline-primary" type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default SignupForm;
