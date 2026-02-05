import express from 'express';
import jwt from 'jsonwebtoken';
import {
  authTokenLifeSpanMinutes,
  secretKeyAuth,
  secretKeyRefresh,
} from '../constants/auth-constants.js';

const router = express.Router();

router.post('/', async (req, res) => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    jwt.verify(refreshToken, secretKeyRefresh, (err, decoded) => {
      if (err) {
        return res.status(406).json({ message: 'rejected' });
      } else {
        const { user } = decoded;
        const authTokenMaxMins = authTokenLifeSpanMinutes ?? 10;
        const accessToken = jwt.sign({ user }, secretKeyAuth, {
          expiresIn: `${authTokenMaxMins}m`,
        });

        // TODO: create a new refresh token here too (i.e token rotation).

        res.json({ token: accessToken });
      }
    });
  } else {
    return res.status(406).json({ message: 'rejected' });
  }
});

export default router;
