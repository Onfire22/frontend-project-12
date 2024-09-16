import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActive, removeChannel, initialState } from '../store/slices/channelsSlice';
import { closeModal } from '../store/slices/modalsSlice';

const RemoveModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    dispatch(removeChannel());
    dispatch(closeModal());
    dispatch(setActive(initialState.activeChannel));
    toast.warn(t('channelsHandlers.channelRemoved'));
  };

  return (
    <Modal centered show="true" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2 btn-secondary" type="button" onClick={() => dispatch(closeModal())}>Отменить</Button>
          <Button className="btn-danger" type="button" onClick={() => handleClick()}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
