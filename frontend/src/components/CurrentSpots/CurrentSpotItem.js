import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDeleteSpotModal, setSpotForEditing } from "../../store/ui";


export default function CurrentSpotMapItem({ spot }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const navigateToDetails = () => {

    history.push(`/spots/${spot.id}`);
  };

  const navigateToEdit = () => {

    history.push(`/spots/${spot.id}/edit`);
  };

  const openDeleteModal = (event) => {

    event.stopPropagation();
    dispatch(setSpotForEditing(spot)); 
    dispatch(setDeleteSpotModal(true));
  };


  return (
    <div className="SpotMapItem" onClick={navigateToDetails}>
      <img
        src={spot.previewImage ? spot.previewImage : "/images/placeholder.png"}
        alt="previewImage"
      />
      <div className="SpotMapItemDescription">
        <div className="SpotMapItemFirstRow">
          <div>
            <strong>
              {spot.city}, {spot.state}
            </strong>
          </div>
          {spot.avgRating && (
            <div className="SpotMapItemStarRating">
              <i className="fa fa-star" aria-hidden="true"></i> {spot.avgRating}
            </div>
          )}
        </div>
        <div className="SpotMapItemPrice">
          <strong>${spot.price}</strong> night
        </div>
        <button
          className="UpdateButton"
          onClick={(e) => {
            e.stopPropagation();

            navigateToEdit();
          }}
        >
          Update
        </button>
        <button
          className="DeleteButton"
          onClick={(e) => {
            e.stopPropagation();
            openDeleteModal(e);
          }}
        >
          Delete Spot
        </button>
      </div>
    </div>
  );
}
