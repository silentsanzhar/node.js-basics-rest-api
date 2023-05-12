import * as groupService from '../services/group.service.js';

import { Router, Request, Response, NextFunction } from 'express';
import {
  addUsersToGroupValidation,
  asyncFuncErrorHandler,
  createOrUpdateGroupValidation,
  sendSuccessfulResponse,
} from '../validation/middleware/index.js';
import { AddUsersToGroupDTO, GroupDTO } from '../interfaces/index.js';

const groupsRouter: Router = Router();

groupsRouter.post('/', createOrUpdateGroupValidation, async (req: Request, res: Response, next: NextFunction) => {
  const payload: GroupDTO = req.body;
  const result = await asyncFuncErrorHandler(req, res, next, groupService.createGroup, payload);

  return sendSuccessfulResponse(req, res, result);
});

groupsRouter.put('/:id', createOrUpdateGroupValidation, async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const payload: GroupDTO = req.body;
  const result = await asyncFuncErrorHandler(req, res, next, groupService.updateGroup, id, payload);

  return sendSuccessfulResponse(req, res, result);
});

groupsRouter.put('/:id/users', addUsersToGroupValidation, async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const payload: AddUsersToGroupDTO = req.body;
  const result = await asyncFuncErrorHandler(req, res, next, groupService.addUsersToGroup, id, payload);

  return sendSuccessfulResponse(req, res, result);
});

groupsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const result = await asyncFuncErrorHandler(req, res, next, groupService.getAllGroups);

  return sendSuccessfulResponse(req, res, result);
});

groupsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const result = await asyncFuncErrorHandler(req, res, next, groupService.getGroupById, id);

  return sendSuccessfulResponse(req, res, result);
});

groupsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const result = await asyncFuncErrorHandler(req, res, next, groupService.deleteGroupById, id);

  return sendSuccessfulResponse(req, res, result);
});

export default groupsRouter;
