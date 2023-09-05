import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Header from "../NavBar/TopBar";
import { getSpots } from "../../store/spots";
import CurrentSpotMapItem from "./CurrentSpotItem";
import DeleteSpotFormModal from "../Modals/DeleteSpot/DeleteSpotModal";
import "./CurrentSpots.css";

export default function ManageMySpots() {

  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));
  const user = useSelector((state) => state.session.user);
  const showDeleteSpotModal = useSelector((state) => state.ui.showDeleteSpotModal);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const mySpots = spots.filter((spot) => spot.ownerId === user.id);

  return (
    <>
      <Header className="TopBar" />
      <div className="ManageMySpotsHeader">
        <h1>Manage Spots</h1>
        <Link to="/spots/new">
          <button className="CreateNewSpotButton">Create a New Spot</button>
        </Link>
      </div>
      <div className="SpotMap">
        {mySpots.map((spot, i) => (
          <CurrentSpotMapItem key={i} spot={spot} />
        ))}
      </div>

      {showDeleteSpotModal && <DeleteSpotFormModal />}
    </>
  );
}
