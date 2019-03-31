const express = require('express');
const helmet = require('helmet');
const Boom = require('boom');
const cors = require('cors')

const logger = require('./src/tools/logger');

require('dotenv').config();

const indexRouter = require('./src/routes');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send(Boom.notFound('Not implemented or wrong endpoint call.'));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

logger.info('Server is running!!');
module.exports = app;
