// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotMap from "./components/SpotMap/SpotMap";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import Modals from "./components/Modals";
import SpotForm from "./components/NewSpot";
import EditSpot from "./components/Modals/UpdateSpot";
import ManageMySpots from "./components/CurrentSpots/CurrentSpots";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Modals />
      {isLoaded && (
        <Switch>
          <Route path="/spots/new"><SpotForm /></Route>
          <Route path="/spots/:spotId/edit"><EditSpot /></Route>
          <Route path="/spots/:spotId"><SpotDetails /></Route>
          <Route path="/login"><LoginFormPage /></Route>
          <Route path="/signup"><SignupFormPage /></Route>
          <Route path="/current"><ManageMySpots /></Route>

          <Route exact path="/"><SpotMap /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
