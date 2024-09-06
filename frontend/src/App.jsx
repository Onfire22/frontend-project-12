import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes/routes';
import Login from './pages/Login';
import Chat from './pages/Chat';
import NotFound from './pages/404';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path={ROUTES.chat}
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          )}
        />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
