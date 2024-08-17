import React from "react";
import "./PlaceList.css";
import Card from "../../shared/components/UIElements/Card";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }
  return (
    <>
      <div>PlaceList</div>
    </>
  );
};

export default PlaceList;
