import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/modal';
import DeleteSpotForm from './DeleteSpot';
import { setDeleteSpotModal } from '../../../store/ui';

function DeleteSpotFormModal() {
  const dispatch = useDispatch();



  return (
    <Modal onClose={() => dispatch(setDeleteSpotModal(false))}>

    </Modal>
  );
}

export default DeleteSpotFormModal;
