import { v4 as uuidv4 } from "uuid";
import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@gmail.com",
    password: "12345",
    image: "",
    places: 3,
  },
];

const getUsers = (req, res, next) => {
  return res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;
  const createdUser = {
    name,
    email,
    password,
    id: uuidv4(),
  };
  DUMMY_USERS.push(createdUser);
  return res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        401
      )
    );
  }
  return res.json({ message: "Logged in!" });
};

export { getUsers, signup, login };
