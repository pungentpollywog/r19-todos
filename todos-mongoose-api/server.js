// server.js
import mongoose from 'mongoose';

import { app } from './app.js';
import { mongodbURI } from './src/constants/db-constants.js';

const port = 3000;
let server;

mongoose.connect(mongodbURI, { serverSelectionTimeoutMS: 5000 }).then(() => {
  console.log(`Connected to ${mongodbURI}`);
  server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

function shutdown() {
  server.close(() => {
    console.log('Express server closed.');
    mongoose
      .disconnect()
      .then(() => {
        console.log(
          'Mongoose default connecction disconnected during to app termination.'
        );
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error disconnecting Mongoose:', err);
        process.exit(1);
      });
  });
}

process.on('SIGINT', shutdown); // ctrl+c
process.on('SIGTERM', shutdown); // other termination signals
