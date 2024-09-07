import Spinner from 'react-bootstrap/Spinner';

const MessagesSpinner = () => {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <p>Загрузка сообщений...</p>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default MessagesSpinner;
