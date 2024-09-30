import Spinner from 'react-bootstrap/Spinner';

const Loader = ({ translate = () => {}, text }) => (
  <div className="h-100 d-flex flex-column align-items-center justify-content-center">
    <p>{`${translate('loader.loading')} ${text}`}</p>
    <Spinner animation="border" variant="primary" />
  </div>
);

export default Loader;
