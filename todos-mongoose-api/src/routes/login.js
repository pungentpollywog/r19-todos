import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import {
  secretKeyAuth,
  secretKeyRefresh,
  authTokenLifeSpanMinutes,
  refreshTokenLifeSpanDays,
} from '../constants/auth-constants.js';

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
        const authTokenMaxMins = authTokenLifeSpanMinutes ?? 10;
        const refreshTokenMaxDays = refreshTokenLifeSpanDays ?? 30;
        if (error) {
          return next(error);
        }

        const body = {
          _id: user._id,
          username: user.username,
        };
        const accessToken = jwt.sign({ user: body }, secretKeyAuth, {
          expiresIn: `${authTokenMaxMins}m`,
        });

        const refreshToken = jwt.sign({ user: body }, secretKeyRefresh, {
          expiresIn: `${refreshTokenMaxDays}d`,
        });

        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false, // TODO: make true for production (get from .env)
          maxAge: refreshTokenMaxDays * 24 * 60 * 60 * 1000,
        });

        return res.json({ token: accessToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(406).json({ message: 'Rejected' });
});

export default router;
