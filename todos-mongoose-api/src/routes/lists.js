import express from 'express';
import mongoose from 'mongoose';

import List from '../models/List.js';

import { mongodbURI } from '../constants/db-constants.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  let { limit = 10, page = 1 } = req.query;
  limit = +limit;
  page = +page;
  const offset = (page - 1) * limit;

  try {
    await mongoose.connect(mongodbURI, { serverSelectionTimeoutMS: 5000 });

    const total = await List.estimatedDocumentCount();
    const pages = Math.ceil(total / limit);
    const docs = await List.find().limit(limit).skip(offset).exec();
    const response = {
      totalItems: total,
      totalPages: pages,
      currentPage: page,
      itemsPerPage: limit,
      lists: docs,
    };

    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  } finally {
    mongoose.connection.close();
  }

  // res.send(JSON.stringify({'message': 'got request for all lists'}));
});

router.get('/:id', async (req, res, next) => {
  // TODO: implement this
  res.send(
    JSON.stringify({
      message: `got request for list with id of ${req.params.id}`,
    })
  );
});

router.post('/', async (req, res, next) => {
  try {
    await mongoose.connect(mongodbURI, { serverSelectionTimeoutMS: 5000 });
    const doc = await List.create(req.body);
    console.log(doc);
    if (doc) {
      res.send(doc);
      //   res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  } finally {
    mongoose.connection.close();
  }

  // res.send(
  //   JSON.stringify({
  //     message: `TODO: create list with data: ${JSON.stringify(req.body)}`,
  //   })
  // );
});

router.put('/:id', async (req, res, next) => {
  res.send(
    JSON.stringify({
      message: `TODO: replace list with data: ${JSON.stringify(req.body)}`,
    })
  );
});

router.patch('/:id', async (req, res, next) => {
  try {
    await mongoose.connect(mongodbURI, { serverSelectionTimeoutMS: 5000 });
    const doc = await List.findByIdAndUpdate(req.params.id, req.body).exec();
    doc ? res.send(doc) : res.status(404).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  } finally {
    mongoose.connection.close();
  }
});

router.delete('/:id', async (req, res, next) => {
  // res.send(JSON.stringify({'message': `TODO: delete list with id: ${req.params.id}`}));

  try {
    await mongoose.connect(mongodbURI, { serverSelectionTimeoutMS: 5000 });
    const result = await List.deleteOne({ _id: req.params.id });
    if (result.acknowledged && result.deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  } finally {
    mongoose.connection.close();
  }
});

export default router;
