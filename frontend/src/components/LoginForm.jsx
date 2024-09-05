const LoginForm = () => {
  return (
    <form className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input className="form-control" placeholder="Ваш ник" id="username" name="username" type="text" />
        <label className="form-label" htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input className="form-control" placeholder="Ваш ник" id="password" name="password" type="password" />
        <label className="form-label" htmlFor="password">Пароль</label>
      </div>
      <button className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
