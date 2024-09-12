import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createChannel, setActive } from '../store/slices/channelsSlice';

const AddModal = ({ show, toggleModal }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      dispatch(createChannel(values.name));
      dispatch(toggleModal());
      dispatch(setActive(values.name));
    },
  });

  return (
    <Modal centered show={show} onHide>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" id="name" controlId="name">
            <Form.Control
              type="text"
              name="name"
              value={formik.values.text}
              onChange={formik.handleChange}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2 btn-secondary" type="button">Отменить</Button>
            <Button type="submit">Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
