import React from "react";
import unshadedStar from "../assets/unshaded-star.svg";

export default function renderUnshadedStars(rating) {
  const roundedRating = Math.round(rating);
  const missingStars = 5 - roundedRating;
  const unshadedStars = [];
  if (missingStars !== 0) {
    for (let i = 0; i < missingStars; i++) {
      unshadedStars[i] = unshadedStar;
    }
  }
  const unshadedStarsRendered = unshadedStars.map((star) => <img src={star} />);
  return unshadedStarsRendered;
  // Creates an array that fills in unshaded stars if the rating is below 5
}
