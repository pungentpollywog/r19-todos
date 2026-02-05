import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import UserModel from '../models/User.js';

import { secretKeyAuth } from '../constants/auth-constants.js';

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        console.log('in auth/signup');

        let user = await UserModel.findOne({ username });
        // Silently skip the create if the user already exists.
        if (!user) {
          user = await UserModel.create({ username, password });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        // @ts-ignore
        const isValid = await user.isValidPassword(password);

        console.log(password, 'is valid', isValid);

        if (!isValid) {
          return done({ message: 'Invalid password' }, user);
        }

        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: secretKeyAuth,
      // jwtFromRequest: ExtractJwt.fromUrlQueryParameter('auth_token'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
