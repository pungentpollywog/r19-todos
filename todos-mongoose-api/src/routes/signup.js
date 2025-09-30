import express from 'express';
import passport from 'passport';


const router = express.Router();

router.all('/', (req, res, next) => {
  console.log(req.body);
  next();
});

router.post(
  '/', 
  passport.authenticate('signup', {session: false}), 
  async (req, res) => {
    // @ts-ignore
    delete req.user._doc.password;

    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
 );

router.use((err, req, res, next) => {
  console.log('signup error', err);
  res.status(403).send({ err });
});

export default router;