import ReactStars from "react-rating-stars-component";
import React from "react";

function Filter({ setRating }) {
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  return (
    <div id="stars-rating ">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />
    </div>
  );
}

export default Filter;
