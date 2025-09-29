import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { secretKey } from '../constants/auth-constants.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log('login post', req.body);
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err);
        return next(new Error('Unauthenticated'));
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        const body = {
          _id: user._id,
          username: user.username,
        };
        const token = jwt.sign({ user: body }, secretKey, {
          expiresIn: '10m',
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.use((err, req, res, next) => {
  res.status(403).send({ err });
});

export default router;
