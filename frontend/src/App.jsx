import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes/routes';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import NotFound from './pages/404';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

const App = ({ socket }) => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Routes>
      <Route
        path={ROUTES.chat}
        element={(
          <PrivateRoute>
            <Chat socket={socket} />
          </PrivateRoute>
        )}
      />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.signup} element={<Signup />} />
      <Route path={ROUTES.notFound} element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </div>
);

export default App;
