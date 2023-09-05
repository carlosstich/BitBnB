import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postSpot } from '../../store/spots';
import './NewSpot.css';

export default function SpotForm() {
  const dispatch = useDispatch();
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
        const newSpot = await dispatch(postSpot(body, imageUrl));
        history.push(`/spots/${newSpot.id}`);
      } catch (err) {
        setErrors(Object.values(err.errors));
      }
    }
  };

  return (
    <div className="page-container">
      <h1 className="newspot-center-title">Create a new Spot</h1>
      <h2 className="newspot-center-title-sub">Where's your place Located?</h2>
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

        <div className="city-state-container">
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
        </div>
        <hr />




        <div className="description-section">
  <h3 className="description-title">Describe your place to guests</h3>
  <p className="description-subtitle">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
  <textarea
    className="textarea-description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Please write at least 30 characters"
  />
  <span className="error-message">{validationErrors.description}</span>
  <hr />
</div>
<div className="name-section">
  <h4 className="name-title">Create a title for your spot</h4>
  <p className="name-subtitle">Catch guests' attention with a spot title that highlights what makes your place special</p>
  <input
    className="input-name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Name of your spot"
  />
  <span className="error-message">{validationErrors.name}</span>
  <hr />
</div>


<div className="price-section">
  <h4 className="price-title">Set a base price for your spot</h4>
  <p className="price-subtitle">Competitive pricing can help your listing stand out and rank higher in search results.</p>
  <div className="input-price-wrapper">
    <span className="input-price-symbol">$</span>
    <input
      className="input-price"
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Price per night (USD)"
    />
  </div>
  <span className="error-message">{validationErrors.price}</span>
  <hr />
</div>


<div className="image-section">
  <h4 className="image-title">Liven up your spot with photos</h4>
  <p className="image-subtitle">Submit a link to at least one photo to publish your spot.</p>
  <input
    type="text"
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
    placeholder="Preview Image URL"
  />
  <span className="error-message">{validationErrors.imageUrl}</span>
</div>


        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}
