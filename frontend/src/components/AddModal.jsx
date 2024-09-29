import filter from 'leo-profanity';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { setActive } from '../store/slices/channelsSlice';
import { closeModal } from '../store/slices/modalsSlice';
import { useModalValidation } from '../hooks/validateHooks';
import { useCreateChannelMutation, useFetchChannelsQuery } from '../store/api/channelsApi';

const AddModal = () => {
  const { data: channels } = useFetchChannelsQuery();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const schema = useModalValidation(channels);
  const { t } = useTranslation();
  const [addChannel] = useCreateChannelMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values) => {
      const censured = filter.clean(values.name);
      addChannel(censured)
        .then(({ data }) => {
          dispatch(setActive(data));
          dispatch(closeModal());
          toast.success(t('toasts.channelAdd'));
        })
        .catch((e) => {
          formik.errors.name = e.message;
        });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal centered show="true" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              id="name"
              isInvalid={formik.errors.name}
              ref={inputRef}
              value={formik.values.text}
              onChange={formik.handleChange}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('tips.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" type="button" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
            <Button type="submit">{t('modals.submit')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
