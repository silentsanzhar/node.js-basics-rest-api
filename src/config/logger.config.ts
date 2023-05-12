import winston from 'winston';

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [new winston.transports.Console(), new winston.transports.File({ filename: 'logs/all.log' })];

/*==============================================================================================================*/
const logger = winston.createLogger({
  level: 'debug',
  format: format,
  transports: transports,
  exceptionHandlers: [new winston.transports.File({ filename: 'logs/exception.log' })],
  rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })],
});

export default logger;
