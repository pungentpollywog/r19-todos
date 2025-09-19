import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return next(new Error('An error occurred.'));
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        const body = {
          _id: user._id,
          username: user.username,
        };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;
