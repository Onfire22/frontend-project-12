import Spinner from 'react-bootstrap/Spinner';

const Loader = ({ text }) => {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <p>{`Загрузка ${text}...`}</p>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
