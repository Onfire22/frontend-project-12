import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActive, initialState } from '../store/slices/channelsSlice';
import { closeModal } from '../store/slices/modalsSlice';
import { useRemoveChannelMutation } from '../store/api/channelsApi';

const RemoveModal = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.modals.data);
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();

  const handleClick = () => {
    removeChannel(currentChannel)
      .then(() => {
        dispatch(closeModal());
        dispatch(setActive(initialState.activeChannel));
        toast.warn(t('toasts.channelRemove'));
      });
  };

  return (
    <Modal centered show="true" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            type="button"
            variant="secondary"
            onClick={() => dispatch(closeModal())}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => handleClick()}
          >
            {t('modals.removeChannel')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
