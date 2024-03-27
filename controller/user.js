import { registerUser, loginUser, getUserProfile, editUserProfile  } from "../service/user.js";
import { userRegisterSchema, userLoginSchema, updateProfileSchema } from "../schema/user.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    await registerUser({ username, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const token = await loginUser({ email, password });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await getUserProfile(req,userId);
    res.status(200).json(user);
  } catch (err) {
    console.log("ERROR",err,"error")
    next(err);
  }
};

export const editProfile = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { error } = updateProfileSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const user = await editUserProfile(req,userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
