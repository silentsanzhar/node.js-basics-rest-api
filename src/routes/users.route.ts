import * as userService from '../services/users.service.js';

import { Router, Request, Response, NextFunction } from 'express';
import { getAutoSuggestUsersFilter as getAutoSuggestUsersFilter, UserDTO } from '../interfaces/index.js';
import {
  asyncFuncErrorHandler,
  createOrUpdateUserValidation,
  getAutoSuggestUsersValidation,
  sendSuccessfulResponse,
} from '../validation/middleware/index.js';

const usersRouter: Router = Router();

usersRouter.post('/', createOrUpdateUserValidation, async (req: Request, res: Response, next: NextFunction) => {
  const payload: UserDTO = req.body;
  const result = await asyncFuncErrorHandler(req, res, next, userService.createUser, payload);

  return sendSuccessfulResponse(req, res, result);
});

usersRouter.put('/:id', createOrUpdateUserValidation, async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const payload: UserDTO = req.body;
  const result = await asyncFuncErrorHandler(req, res, next, userService.updateUser, id, payload);

  return sendSuccessfulResponse(req, res, result);
});

usersRouter.get('/', getAutoSuggestUsersValidation, async (req: Request, res: Response, next: NextFunction) => {
  const filter: getAutoSuggestUsersFilter = req.query;
  const result = await asyncFuncErrorHandler(req, res, next, userService.getAllUsers, filter);

  return sendSuccessfulResponse(req, res, result);
});

usersRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const result = await asyncFuncErrorHandler(req, res, next, userService.getUserById, id);

  return sendSuccessfulResponse(req, res, result);
});

usersRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const result = await asyncFuncErrorHandler(req, res, next, userService.deleteUserById, id);

  return sendSuccessfulResponse(req, res, result);
});

export default usersRouter;
