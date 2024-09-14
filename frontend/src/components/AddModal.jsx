import * as yup from 'yup';
import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createChannel } from '../store/slices/channelsSlice';
import { closeModal } from '../store/slices/modalsSlice';

const AddModal = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels, 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      schema.validate(values)
        .then(() => {
          dispatch(createChannel(values.name));
          dispatch(closeModal());
        })
        .catch((e) => {
          formik.errors.name = e.message;
        });
    },
  });

  const inputClasses = cn('mb-2', {
    'form-control is-invalid': formik.errors.name,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal centered show="true" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" id="name" controlId="name">
            <Form.Control
              className={inputClasses}
              type="text"
              name="name"
              ref={inputRef}
              value={formik.values.text}
              onChange={formik.handleChange}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <div className="invalid-feedback">{formik.errors.name}</div>
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
