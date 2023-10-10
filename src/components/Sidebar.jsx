import React, {useState, useEffect} from "react";

export default function Sidebar({formData, setFormData, information}) {
  // Create state that tracks what the user is looking for (hotel, restaurant, or attraction)
  // Make a call to the api based on what the state value is 
  // Pass the api data as props to the Sidebar api, and display on the screen

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prevFormData => (
      {
        ...prevFormData,
        [name]: value,
      }
    ))
  }

  return (
    <section>
      <h1>Food & Dining Around You</h1>
      <div className="inputs-container">
        <div style={{marginRight: '12px'}}>
          <div className="type-label">Type</div>
          <select name="info" value={formData.info} onChange={handleChange}>
            <option value="restaurants">Restaurants</option>
            <option value="hotels">Hotels</option>
            <option value="attractions">Attractions</option>
          </select>
        </div>
        <div>
        <div className="rating-label">Rating</div>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value="">All</option>
            <option value={3}>Above 3.0</option>
            <option value={4}>Above 4.0</option>
            <option value={4.5}>Above 4.5</option>
          </select>
        </div>
      </div>
      {!information.length && <div className="loading-spinner"></div>}

    </section>
  )
}