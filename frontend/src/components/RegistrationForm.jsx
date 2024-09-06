const RegistrationForm = () => {
  return (
    <form className="w-50">
      <h1 className="text-center mb-4">Регистрация</h1>
      <div className="form-floating mb-3">
        <input className="form-control" type="text" placeholder="От 3 до 20 символов" name="username" required id="username" />
        <label className="form-label" htmlFor="username">Имя пользователя</label>
      </div>
      <div className="form-floating mb-3">
        <input className="form-control" type="password" placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required id="password" />
        <label className="form-label" htmlFor="password">Пароль</label>
      </div>
      <div className="form-floating mb-4">
        <input className="form-control" type="password" name="confirmPassword" required id="confirmPassword" />
        <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
      </div>
      <button className="w-100 btn btn-outline-primary" type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;
