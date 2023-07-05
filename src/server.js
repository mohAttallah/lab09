'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');
const authRoutes = require('./routes/auth.js');

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.use(authRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "work" })
})
app.get('/intentionalError', intentionalError);

app.use('*', notFoundHandler);
app.use(errorHandler);

function intentionalError(req, res, next) {
  req.body = {
    test: 'test'
  }
  next({ message: 'some kind of error :(' });
}


app.use(intentionalError)

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
