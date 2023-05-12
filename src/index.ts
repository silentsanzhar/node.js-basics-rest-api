import express, { json } from 'express';
import routes from './routes/index.js';
import morganMiddleware from './validation/middleware/morgan.middleware.js';
import logger from './config/logger.config.js';
import cors from 'cors';

import { failSafeErrorHandler, generalErrorHandler } from './validation/middleware/index.js';

const app = express();
const port: number = Number(process.env.PORT) || 3000;
const apiVersion: string = 'v1';

app.listen(port, () => console.log(`CORS-enabled web server is listening on port: ${port}`));

app.use(cors());
app.use(json());
app.use(morganMiddleware);
app.use(`/api/${apiVersion}`, routes, generalErrorHandler, failSafeErrorHandler);

process.on('unhandledRejection', (reason, p) => {
  logger.log('error', `Unhandled Rejection at: ${p} reason: ${reason}`);
  logger.on('finish', () => process.exit());
  logger.end();
});

process.on('uncaughtException', (err, origin) => {
  logger.log('error', `caught exception: ${err}, exception origin: ${origin}`);
  logger.on('finish', () => process.exit());
  logger.end();
});
