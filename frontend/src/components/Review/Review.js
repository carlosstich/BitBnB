import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";

export default function Review({ user, review }) {
    const dispatch = useDispatch();
    const onDeleteClick = async () => {
        await dispatch(deleteReview(review));
    }
    return <div className="review">
        <div className="user">
            <h4>{review.User.firstName}</h4>
            {(user && user.id === review.User.id) && <button className="button" onClick={onDeleteClick}>Delete review</button>}
        </div>
        <p>{review.review}</p>
    </div>
}
