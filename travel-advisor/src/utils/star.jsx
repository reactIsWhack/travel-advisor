import React from "react";
import star from "../assets/star.svg";

export function convertRatingToStars(rating) {
  const roundedRating = Math.round(rating);
  const stars = [];
  for (let i = 0; i < roundedRating; i++) {
    stars[i] = star;
  }
  const starsRendered = stars.map((star) => {
    return <img src={star} />;
  });
  return starsRendered;
  // Creates an array with star images as a jsx elements. The amount of stars in the array is equal to the restaurants rating rounded.
}
