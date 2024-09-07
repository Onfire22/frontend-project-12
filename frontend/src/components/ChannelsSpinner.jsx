import Spinner from 'react-bootstrap/Spinner';

const ChannelsSpinner = () => {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <p>Загрузка каналов...</p>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default ChannelsSpinner;
