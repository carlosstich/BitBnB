import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { putSpot } from '../../../store/spots';
import { getSpotDetails } from '../../../store/spotDetails';
import './UpdateSpot.css';

export default function EditSpot() {
  const { spotId } = useParams();
  console.log("Spot ID:", spotId);
  const dispatch = useDispatch();
  const spotDetails = useSelector(state => state.spotDetails);
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [fetched, setFetched] = useState(false);



  useEffect(() => {
    if (spotDetails && spotDetails.Spot) {
      setAddress(spotDetails.Spot.address);
      setCity(spotDetails.Spot.city);
      setState(spotDetails.Spot.state);
      setCountry(spotDetails.Spot.country);
      setName(spotDetails.Spot.name);
      setDescription(spotDetails.Spot.description);
      setPrice(spotDetails.Spot.price);
    }
  }, [spotDetails]);


    const validateForm = () => {
      const newErrors = {};
      if (!country) newErrors.country = "Country is required";
      if (!address) newErrors.address = "Address is required";
      if (!city) newErrors.city = "City is required";
      if (!state) newErrors.state = "State is required";
      if (!name) newErrors.name = "Name is required";
      if (!description || description.length < 30) newErrors.description = "Description needs a minimum of 30 characters";
      if (!price) newErrors.price = "Price is required";
      if (!imageUrl) newErrors.imageUrl = "Preview image is required";

      setValidationErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]);

      if (validateForm()) {
        const body = { address, city, state, country, name, description, price };
        try {
            const newSpot = await dispatch(putSpot(spotId, body));
          history.push(`/spots/${newSpot.id}`);
        } catch (err) {
          setErrors(Object.values(err.errors));
        }
      }
    };

    useEffect(() => {
        if (spotId && !fetched) {
          setFetched(true);
          dispatch(getSpotDetails(spotId));
        }
      }, [dispatch, spotId]);
    //console.log({city})

    return (

      <div className="page-container">
        <h1 className="center-title">Update this Spot</h1>
        <p className="center-subtitle">Guests will only get your exact address once they book a reservation.</p>
        <form className="spotForm" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}

          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
          <span className="error-message">{validationErrors.country}</span>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <span className="error-message">{validationErrors.address}</span>

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <span className="error-message">{validationErrors.city}</span>

          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          />
          <span className="error-message">{validationErrors.state}</span>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <span className="error-message">{validationErrors.name}</span>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <span className="error-message">{validationErrors.description}</span>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <span className="error-message">{validationErrors.price}</span>

          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          />
          <span className="error-message">{validationErrors.imageUrl}</span>

          <button type="submit">Edit Spot</button>
        </form>
      </div>
    );
  }
