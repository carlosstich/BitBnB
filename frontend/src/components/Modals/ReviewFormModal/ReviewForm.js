import "./ReviewForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviewModal } from "../../../store/ui";
import { useHistory } from "react-router-dom";
import { postReview } from "../../../store/reviews";

export default function ReviewForm() {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spotDetails);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const body = { review, stars };
            await dispatch(postReview(spot.Spot.id, body));
        }
        catch (errors) {

            setErrors([errors.message])
        }
    };




    return (
        <form className="reviewForm" onSubmit={handleSubmit}>
            <div className="reviewHeader">
                <div>Leave a review</div>
            </div>
            <div className="line"></div>
            {errors.length > 0 && <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>}
            <div className="reviewFirstFieldWrapper">
                <select
                    className="field reviewFirstField"
                    name='rating'
                    onChange={e => setStars(e.target.value)}
                    value={stars}
                    required
                >
                    <option value='' disabled>Select stars</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>

            </div>

            <textarea
                className="field lastField"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                style={{ height: "150px" }}
                placeholder="Review"
            />

            <button className="reviewButton" type="submit">Leave a  review</button>
        </form>
    );
}
