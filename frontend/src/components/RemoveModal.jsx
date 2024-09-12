import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RemoveModal = () => {
  return (
    <Modal centered show={show} onHide>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2 btn-secondary" type="button">Отменить</Button>
          <Button className="btn-danger" type="button">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
