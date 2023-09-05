import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import DeleteModal from '../Modals/DeteleReview/DeteteReview';

export default function Review({ user, review }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onDeleteConfirmed = async () => {
    await dispatch(deleteReview(review));
    setIsModalOpen(false);
  };

  const createdAtDate = new Date(review.createdAt);
  const formattedCreatedAt = createdAtDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="review">
      <div className="user">
        <h4>{review.User.firstName}</h4>
        <span className="createdAt">{formattedCreatedAt}</span>
        {user && user.id === review.User.id && (
          <button className="button" onClick={onOpenModal}>
            Delete review
          </button>
        )}
      </div>
      <p>{review.review}</p>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onDelete={onDeleteConfirmed}
      />
    </div>
  );
}
