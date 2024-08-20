import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const PLACES = [
  {
    id: "p1",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://www.esbnyc.com/sites/default/files/2020-01/ESB%20Day.jpg",
    address: "20 W 34th St, New York, NY 10118, United States",
    location: {
      lat: 40.748817,
      lng: -73.985428,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://www.esbnyc.com/sites/default/files/2020-01/ESB%20Day.jpg",
    address: "20 W 34th St, New York, NY 10118, United States",
    location: {
      lat: 40.748817,
      lng: -73.985428,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const params = useParams();
  const userId = params.userId;
  const loadedPlaces = PLACES.filter((place) => place.creator === userId);
  return (
    <>
      <PlaceList items={loadedPlaces} />
    </>
  );
};

export default UserPlaces;
