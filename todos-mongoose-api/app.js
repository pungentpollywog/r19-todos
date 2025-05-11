import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import listsRouter from './src/routes/lists.js';

const app = express();
const port = 3000;

app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.get('/',  (req, res) => {
  res.send('Mongoose TODOs API');
});

app.use('/lists', listsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
