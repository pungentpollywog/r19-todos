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
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    })
  }
 );

export default router;