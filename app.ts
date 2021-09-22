import express from 'express';
import logger from 'morgan';
import http from 'http';
import config from './config/config';

import uomRouter from './routes/uomRoute';
import igStateRouter from './routes/igStateRoute';
import igTypeRouter from './routes/igTypeRoute';
import igRouter from './routes/igRoute';
import inflowRouter from './routes/inflowRoute';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, content-type, application/json, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT ,POST ,DELETE');
  next();
});

// router
app.use('/uom', uomRouter);
app.use('/igstate', igStateRouter);
app.use('/igtype', igTypeRouter);
app.use('/ig', igRouter);
app.use('/inflow', inflowRouter);

app.get('/', (req, res) => res.send('Express'));

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
      message: error.message
  });
});

// Create HTTP server
const server = http.createServer(app);

server.listen(config.server.port, () => {
  console.log(`⚡️[server]: Server is running at ${config.server.hostname}:${config.server.port}`);
});
