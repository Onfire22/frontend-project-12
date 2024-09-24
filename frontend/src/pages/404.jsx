import { Link } from 'react-router-dom';
import notFound from '../images/404.svg';
import { ROUTES } from '../routes/routes';

const NotFound = () => (
  <div className="text-center">
    <img src={notFound} alt="not found" />
    <h1 className="h4 text-muted">Страница не найдена :(</h1>
    <p className="text-muted">
      Но вы можете перейти
      <Link to={ROUTES.chat}> на главную страницу</Link>
    </p>
  </div>
);

export default NotFound;
