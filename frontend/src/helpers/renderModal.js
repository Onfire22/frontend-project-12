import AddModal from '../components/AddModal';
import RenameModal from '../components/RenameModal';
import RemoveModal from '../components/RemoveModal';

const renderModal = (name) => {
  const modals = {
    add: AddModal,
    rename: RenameModal,
    remove: RemoveModal,
  };
  if (!name) {
    return null;
  }
  const Modal = modals[name];
  return <Modal />;
};

export default renderModal;
