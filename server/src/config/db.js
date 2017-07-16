/* eslint-disable no-console */

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

try {
  mongoose.connect('mongodb://localhost/tweeter-dev', {
    useMongoClient: true,
  });
} catch (err) {
  mongoose.createConnection('mongodb://localhost/tweeter-dev', {
    useMongoClient: true,
  });
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
