import { Router } from "express";
import * as placeControllers from "../controllers/place-controller.js";
import { check } from "express-validator";

const placesRoutes = Router();

placesRoutes.get("/:placeId", placeControllers.getPlaceById);

placesRoutes.get("/user/:userId", placeControllers.getPlacesByUserId);

placesRoutes.post(
  "/",
  [
    check("title").not().isEmpty().withMessage("Title is required"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
  ],
  placeControllers.createPlace
);

placesRoutes.patch(
  "/:placeId",
  [
    check("title").optional().not().isEmpty().withMessage("Title is required"),
    check("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
  ],
  placeControllers.updatePlace
);

placesRoutes.delete("/:placeId", placeControllers.deletePlace);

export default placesRoutes;
