import { useSelector } from "react-redux";
import Review from "./Review";
import ReviewHeader from "./ReviewHeader";
import './Reviews.css'

export default function Reviews({ spot, reviews }) {


    const user = useSelector(state => state.session.user);
    if (!reviews) {

        return null;
    }

    const userReviewed = user && reviews.some(review => review.User.id === user.id);
    const userOwnsSpot = user && spot.ownerId === user.id;

    return (
        <div>
            <ReviewHeader user={user} reviews={reviews} spot={spot} userReviewed={userReviewed} userOwnsSpot={userOwnsSpot} />
            <div className="reviews">
                {reviews.map((review, i) => <Review key={i} review={review} user={user} />)}
            </div>
        </div>
    );
}
