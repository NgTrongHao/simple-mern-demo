import { v4 as uuidv4 } from "uuid";
import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import User from "../models/user.js";

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

const getUsers = async (req, res, next) => {
  // return res.json({ users: DUMMY_USERS });
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }
  return res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;
  let existedUser;
  try {
    existedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }
  if (existedUser) {
    return next(
      new HttpError("User exists already, please login instead.", 422)
    );
  }
  // const createdUser = {
  //   name,
  //   email,
  //   password,
  //   id: uuidv4(),
  // };
  // DUMMY_USERS.push(createdUser);
  const createdUser = new User({
    name,
    email,
    password,
  });
  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }
  return res
    .status(201)
    .json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;
  // const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }
  if (!identifiedUser) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        403
      )
    );
  }
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
