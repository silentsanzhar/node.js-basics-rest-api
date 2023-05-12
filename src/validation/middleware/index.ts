import Joi from 'joi';
import logger from '../../config/logger.config.js';
import jwt from 'jsonwebtoken';

import { RequestHandler, Request, Response, NextFunction } from 'express';
import { ErrorWithStatusCode } from '../../interfaces/index.js';
import { createOrUpdateUserSchema, getAutoSuggestUsersSchema, loginUserSchema } from '../schemas/user.schema.js';
import { BaseError } from 'sequelize';
import { addUsersToGroupSchema, createOrUpdateGroupSchema } from '../schemas/group.schema.js';

const validateSchema = (_schema: Joi.ObjectSchema<any>, propertyToValidate: 'body' | 'query'): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = _schema.validate(req[propertyToValidate]);

    if (error === undefined) {
      return next();
    }

    const message = error.details.map((i) => i.message).join(',');
    const errorWithStatusCode = new Error(message) as ErrorWithStatusCode;
    errorWithStatusCode.status = 400;

    return next(errorWithStatusCode);
  };
};

/*=================================================================================================================*/
export const createOrUpdateUserValidation = validateSchema(createOrUpdateUserSchema, 'body');
export const getAutoSuggestUsersValidation = validateSchema(getAutoSuggestUsersSchema, 'query');
export const loginUserValidation = validateSchema(loginUserSchema, 'body');

export const createOrUpdateGroupValidation = validateSchema(createOrUpdateGroupSchema, 'body');
export const addUsersToGroupValidation = validateSchema(addUsersToGroupSchema, 'body');

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export const asyncFuncErrorHandler = async <T extends unknown[]>(
  req: Request,
  res: Response,
  next: NextFunction,
  func: (...args: T) => Promise<unknown> | never,
  ...funcArgs: T
) => {
  const funcLogMsg = `${func.name}(${funcArgs.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(', ')})`;

  try {
    const startTime = Date.now();
    const result = await func(...funcArgs);
    const endTime = Date.now();

    logger.info(`Execution time of service ${funcLogMsg} is ${endTime - startTime} milliseconds`);

    return result;
  } catch (error) {
    if (error instanceof BaseError) {
      (error as unknown as ErrorWithStatusCode).status = 400;
    }

    logger.log('error', `Execution of service ${funcLogMsg} has failed`);

    return next(error);
  }
};

export const generalErrorHandler = (err: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => {
  if (err.status && err.message) {
    logger.log('error', err.message);
    return res.status(err.status).json({ success: false, error: err.message });
  } else {
    return next(err);
  }
};

export const failSafeErrorHandler = (err: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => {
  logger.log('error', 'Unhandled error: ' + err);
  return res.status(500).json({ success: false, error: err });
};
/* eslint-enable @typescript-eslint/no-unused-vars, no-unused-vars */

export const sendSuccessfulResponse = (req: Request, res: Response, result: unknown) => {
  return req.method === 'DELETE'
    ? res.status(204).json({
        success: result,
      })
    : res.status(200).json(result);
};

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  const parseBearer = (authorizationHeader: string): string | null => {
    const [type, token] = authorizationHeader.trim().split(' ');

    return type !== 'Bearer' ? null : token;
  };

  const authorizationHeader = req.headers.authorization;
  const token = parseBearer(authorizationHeader || '');

  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  return jwt.verify(token, process.env.JWT_SECRET as string, function (err, decoded) {
    if (err) {
      return res.status(403).json({ success: false, error: 'Failed to authenticate token' });
    }

    return next();
  });
};
