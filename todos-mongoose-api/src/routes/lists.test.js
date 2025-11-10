// @ts-nocheck
import request from 'supertest';
import { beforeAll, describe, expect, it, jest } from '@jest/globals';

import { app } from '../../app.js';

import List from '../models/List.js';
import mongoose from 'mongoose';
let findSpy;
let docCountSpy;

const mockDoc = [
  {
    _id: '1000',
    name: 'Groceries',
    tasks: [
      {
        desc: 'cilantro',
        editing: false,
        complete: false,
        _id: '1',
      },
      {
        desc: 'jalapenos',
        editing: false,
        complete: false,
        _id: '2',
      },
    ],
  },
];

describe('List', () => {
  beforeAll(() => {
    findSpy = jest
      .spyOn(List, 'find')
      .mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        exec: jest.fn().mockReturnValue(mockDoc),
      });
    docCountSpy = jest.spyOn(List, 'estimatedDocumentCount')
      .mockReturnValue(2);

    jest.spyOn(mongoose, 'connect').mockResolvedValue({});
    jest.spyOn(mongoose.connection, 'close').mockImplementation(() => {
      console.log('mocking the close function');
      return Promise.resolve();
    })
  });

  describe('GET /lists', () => {
    it('should return all lists', () => {
      return request(app)
        .get('/lists')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          // console.log(res.text);
          expect(res.statusCode).toBe(200);
        });
    });
  });
});
