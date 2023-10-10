import React from "react";
import locationIcon from "../assets/location-icon.svg";
import phoneIcon from "../assets/phone-icon.svg";
import {convertRatingToStars} from "../utils/star";
import renderUnshadedStars from "../utils/unshaded-stars";

export default function Information({rating, name, address, awards, cuisines, img, price, phoneNumber, ranking, tripAdvisorLink, website, reviews}) {

  function getCuisines() {
    if (cuisines) {
      const restaurantCuisines = cuisines.map((cuisine) => (
        <div className="cuisine">{cuisine.name}</div>
      ));
      return restaurantCuisines;
    } else {
      return '';
    }
    
  }
  // Restaurant component, renders restaurant data
  return (
    <section className="restaurant-container">
      <div className="img-container">
        <img className="restaurant-image" src={img} alt="restaurant-image" />
      </div>
      <div className="info-container">
        <div className="name">{name}</div>
      <div className="rating-container">
        <div className="stars">{rating ? convertRatingToStars(rating) : 'No Rating'}{renderUnshadedStars(rating)}</div>
        <div>{reviews} reviews</div>
      </div>
        {price && <div className="price-container">
          <div>Price</div>
          <div>{price}</div>
        </div>}
        {ranking && <div className="ranking-container">
          <div className="rank-label">Ranking</div>
          <div className="rank">{ranking}</div>
        </div>}
        {cuisines && <div className="cuisines">{getCuisines(cuisines)}</div>}
        {address && <div className="location-container">
          <img src={locationIcon} alt="location-icon" />
          <div className="address">{address}</div>
        </div>}
        {phoneNumber && <div className="phone-container">
          <img src={phoneIcon} alt="phone-icon" />
          <div className="phone-number">{phoneNumber}</div>
        </div>}
        <div className="link-container">
          <a className="trip-advisor-link" href={tripAdvisorLink} target="_blank">TRIP ADVISOR</a>
          {website && <a className="website-link" href={website} target="_blank">WEBSITE</a>}
        </div>
      </div>
    </section>
  )
}