import express from 'express';
import jwt from 'jsonwebtoken';
import {
  authTokenLifeSpanMinutes,
  secretKeyAuth,
  secretKeyRefresh,
} from '../constants/auth-constants.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('at /refresh cookies:', req.cookies);
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    console.log('refresh token retrieved by refresh endpoint', refreshToken);

    jwt.verify(refreshToken, secretKeyRefresh, (err, decoded) => {
      if (err) {
        return res.status(406).json({ message: 'rejected' });
      } else {
        const { user } = decoded;
        const authTokenMaxMins = authTokenLifeSpanMinutes ?? 10;
        console.log(user);
        const accessToken = jwt.sign({ user }, secretKeyAuth, {
          expiresIn: `${authTokenMaxMins}m`,
        });

        // TODO: create a new refresh token here too.

        res.json({ token: accessToken });
      }
    });
  } else {
    return res.status(406).json({ message: 'rejected' });
  }
});

export default router;
