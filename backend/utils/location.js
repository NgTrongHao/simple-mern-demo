import axios from "axios";
import HttpError from "../models/http-error.js";

const API_KEY = "AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA";

async function getCoordinateForAddress(address) {
  // try {
  //   const response = await axios.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${API_KEY}`
  //   );

  //   if (response.data.status === "ZERO_RESULTS") {
  //     throw new HttpError(
  //       "Could not find location for the specified address.",
  //       422
  //     );
  //   }

  //   if (!response.data.results || response.data.results.length === 0) {
  //     throw new HttpError(
  //       "Could not find location for the specified address.",
  //       422
  //     );
  //   }

  //   const coordinates = response.data.results[0].geometry.location;
  //   return coordinates;
  // } catch (error) {
  //   throw new HttpError(
  //     "Failed to fetch coordinates. Please try again later.",
  //     500
  //   );
  // }
  return { lat: 40.748817, lng: -73.985428 };
}

export default getCoordinateForAddress;
