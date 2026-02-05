import express from 'express';

import User from '../models/User.js';
import listsRouter from './lists.js';

const router = express.Router();

router.all('/{lists}', async (req, res, next) => {
  if (req.user.roles.includes('admin')) {
    next();
  } else {
    res.status(401).end();
  }
});

router.all('/:userId{/lists}', async (req, res, next) => {
  if (req.user.roles.includes('admin') || req.user.roles.includes('client') && req.user._id === req.params.userId) {
    next();
  } else {
    res.status(401).end();
  }
});

router.use('{/:userId}/lists', listsRouter);

router.get('/', async (req, res, next) => {

  let { limit = 10, page = 1 } = req.query;
  limit = +limit;
  page = +page;
  const offset = (page - 1) * limit;

  try {
    const total = await User.estimatedDocumentCount();
    const pages = Math.ceil(total / limit);
    const docs = await User.find().limit(limit).skip(offset).exec();
    const response = {
      totalItems: total,
      totalPages: pages,
      currentPage: page,
      itemsPerPage: limit,
      users: docs,
    };
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.get('/:id', async (req, res, next) => {
  // TODO: implement this (but strip out the password from data)
  res.send(
    JSON.stringify({
      message: `got request for user with id of ${req.params.id}`,
    }),
  );
})

export default router;