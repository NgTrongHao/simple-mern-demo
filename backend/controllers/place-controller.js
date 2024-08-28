import HttpError from "../models/http-error.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import getCoordinateForAddress from "../utils/location.js";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1024px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    address: "20 W 34th St, New York, NY 10118",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
];

export const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }
  return res.json({ place });
};

export const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }
  return res.json({ places });
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordinateForAddress(address);
  } catch (error) {
    return next(error);
  }
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  return res.status(201).json({ place: createdPlace });
};

export const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const placeId = req.params.placeId;
  const { title, description } = req.body;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;
  return res.json({ place: updatedPlace });
};

export const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    return next(new HttpError("Could not find a place for that id.", 404));
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  return res.json({ message: "Deleted place." });
};
