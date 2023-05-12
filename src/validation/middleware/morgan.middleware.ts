import chalk from 'chalk';
import morgan, { FormatFn, StreamOptions } from 'morgan';
import logger from '../../config/logger.config.js';

const format: FormatFn = (tokens, req, res) => {
  return [
    chalk.yellow(tokens.method(req, res)),
    chalk.blue(tokens.url(req, res)),
    chalk.green(tokens.status(req, res)),
    chalk.yellow(tokens['response-time'](req, res) + ' ms'),
  ].join(' ');
};

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const morganMiddleware = morgan(format, { stream });

export default morganMiddleware;
