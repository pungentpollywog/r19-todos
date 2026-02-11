import express from 'express';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const refreshToken = req.cookies.jwt;

  if (refreshToken) {
    res.clearCookie('jwt', {httpOnly: true});
  }

  return res.status(204).end();
});

export default router;