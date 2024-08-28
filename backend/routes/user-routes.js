import { Router } from "express";
import * as userControllers from "../controllers/user-controller.js";
import { check } from "express-validator";

const userRoutes = Router();

userRoutes.get("/", userControllers.getUsers);

userRoutes.post("/signup", [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
], userControllers.signup);

userRoutes.post("/login", [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
], userControllers.login);

export default userRoutes;
