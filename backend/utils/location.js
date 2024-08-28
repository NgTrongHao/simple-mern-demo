import axios from "axios";
import HttpError from "../models/http-error.js";

const API_KEY = "AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA";

async function getCoordinateForAddress(address) {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    )
    .then((response) => {
      if (response.data.status === "ZERO_RESULTS") {
        const error = new HttpError(
          "Could not find location for the specified address.",
          422
        );
        throw error;
      }
      const coordinates = response.data.results[0].geometry.location;
      return coordinates;
    })
    .catch((error) => {
      throw error;
    });
}

export default getCoordinateForAddress;
