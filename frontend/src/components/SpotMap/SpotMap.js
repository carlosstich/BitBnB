import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import Header from "../NavBar/TopBar";

import "./SpotMap.css";
import { getSpots } from "../../store/spots";
import SpotMapItem from "./SpotMapItem";

export default function SpotMap() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    return <>
    <Header className="TopBar" />
        <div className="SpotMap">
            {spots.map((spot, i) =>
                <NavLink key={i} to={`/spots/${spot.id}`} style={{ textDecoration: 'none' }}>
                    <SpotMapItem spot={spot} />
                </NavLink>)
            }</div >
    </>

}

