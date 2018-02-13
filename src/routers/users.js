import express from "express";
import Users from "../models/user";
import parseErrors from "../utils/parseError";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body.user;
  const user = new Users({ email });
  user.setPassword(password);
  user
    .save()
    .then(userRecord => {
      res.json({ user: userRecord.toAuthJson() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;
