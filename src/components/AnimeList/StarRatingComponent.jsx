import React from "react";
import StarRatings from "react-star-ratings";

const StarRatingComponent = ({ rating }) => (
  <StarRatings
    rating={rating}
    starRatedColor="orange"
    starHoverColor="orange"
    starEmptyColor="grey"
    numberOfStars={5}
    starDimension="20px"
    starSpacing="2px"
  />
);

export default StarRatingComponent;
