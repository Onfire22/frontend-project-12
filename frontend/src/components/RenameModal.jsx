import * as yup from 'yup';
import filter from 'leo-profanity';
import cn from 'classnames';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { renameChannel } from '../store/slices/channelsSlice';
import { closeModal } from '../store/slices/modalsSlice';

const RenameModal = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  filter.loadDictionary('ru');

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
      const censured = filter.clean(values.name);
      schema.validate(values)
        .then(() => {
          dispatch(renameChannel(censured));
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

  return (
    <Modal centered show="true" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" id="name" controlId="name">
            <Form.Control
              className={inputClasses}
              type="text"
              name="name"
              value={formik.values.text}
              onChange={formik.handleChange}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <div className="invalid-feedback">{formik.errors.name}</div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2 btn-secondary" type="button" onClick={() => dispatch(closeModal())}>Отменить</Button>
            <Button type="submit">{t('buttons.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
