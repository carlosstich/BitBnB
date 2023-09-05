import './DeleteSpot.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpot } from "../../../store/spots";
import { setDeleteSpotModal } from "../../../store/ui";

export default function DeleteSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.ui.spot);
    const spotId = spot ? spot.id : null;
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(deleteSpot(spotId))
            .then(() => {
                dispatch(setDeleteSpotModal(false));
                history.push("/");
            })
            .catch(errors => setErrors(Object.values(errors.errors)));
    };

    const handleClose = () => {
        dispatch(setDeleteSpotModal(false));
    };

    return (
        <form className="deleteForm" onSubmit={handleSubmit}>
            <h1>Confirm Delete</h1>
            <h2 style={{ width: "300px" }}>Are you sure you want to delete this spot?</h2> 
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <button className="deleteFormButton" type="submit">Yes (Delete Spot)</button>
            <button
                className="cancelDeleteFormButton"
                type="button"
                onClick={handleClose}
            >
                No (Keep Spot)
            </button>
        </form>
    );
}
