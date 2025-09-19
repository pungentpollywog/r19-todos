import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import UserModel from '../models/User.js';

import { mongodbURI } from '../db-constants.js';

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

        await mongoose.connect(mongodbURI, { serverSelectionTimeoutMS: 5000 });

        // TODO: check for existing username first?

        const user = await UserModel.create({ username, password });
        return done(null, user);
      } catch (error) {
        done(error);
      } finally {
        mongoose.connection.close();
      }
    }
  )
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
        await mongoose.connect(mongodbURI, { serverSelectionTimeoutMS: 5000 });

        const user = await UserModel.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        // @ts-ignore
        const isValid = await user.isValidPassword(password);

        if (!isValid) {
          return done(null, user, { message: 'Invalid password' });
        }

        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        return done(error);
      } finally {
        mongoose.connection.close();
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
        // console.log({token});
        return done(null, token.user);
      } catch (error) {
        // done({msg: 'not authenticated', ...error});
        done(error);
      }
    }
  )
);
