import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/modal';
import { setReviewModal } from '../../../store/ui';
import ReviewForm from './ReviewForm';

function ReviewFormModal() {
    const dispatch = useDispatch();
    const showReviewModal = useSelector(state => state.ui.showReviewModal);
    if (!showReviewModal) return;
    return <Modal onClose={() => dispatch(setReviewModal(false))}>
        <ReviewForm />
    </Modal>
}

export default ReviewFormModal;
