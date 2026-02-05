import express from 'express';

import List from '../models/List.js';

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
  let { limit = 10, page = 1 } = req.query;
  limit = +limit;
  page = +page;
  const offset = (page - 1) * limit;

  try {
    const total = await List.estimatedDocumentCount();
    const pages = Math.ceil(total / limit);
    // @ts-ignore
    const docs = await List.find({owner: req.params.userId}).limit(limit).skip(offset).exec();
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
  }
});

router.get('/:id', async (req, res, next) => {
  // TODO: implement this
  res.send(
    JSON.stringify({
      message: `got request for list with id of ${req.params.id}`,
    }),
  );
});

router.post('/', async (req, res, next) => {
  try {
    const doc = await List.create({...req.body, owner: req.user._id});
    // TODO: update user.lists with the id of this new list
    if (doc) {
      res.status(201).send(doc);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.put('/:id', async (req, res, next) => {
  res.send(
    JSON.stringify({
      message: `TODO: replace list with data: ${JSON.stringify(req.body)}`,
    }),
  );
});

router.patch('/:id', async (req, res, next) => {
  try {
    const doc = await List.findByIdAndUpdate(req.params.id, {...req.body, owner: req.user._id}).exec();
    doc ? res.send(doc) : res.status(404).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await List.deleteOne({ _id: req.params.id, owner: req.user._id });
    if (result.acknowledged && result.deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

export default router;
