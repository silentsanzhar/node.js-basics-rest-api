import usersRouter from './users.route.js';
import groupsRouter from './groups.route.js';
import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response, Router } from 'express';
import { asyncFuncErrorHandler, checkJWT, loginUserValidation, sendSuccessfulResponse } from '../validation/middleware/index.js';
import { loginUser } from '../services/users.service.js';
import { UserDTO } from '../interfaces/index.js';

const router = Router();

router.use('/users', checkJWT, usersRouter);
router.use('/groups', checkJWT, groupsRouter);

router.post('/login', loginUserValidation, async (req: Request, res: Response, next: NextFunction) => {
  const incomingPayload: Omit<UserDTO, 'age'> = req.body;
  const loginSuccess = await asyncFuncErrorHandler(req, res, next, loginUser, incomingPayload.login, incomingPayload.password);

  if (!loginSuccess) {
    return res.status(401).json({
      success: false,
      error: 'Bad login/password combination',
    });
  }

  const outcomingPayload = { login: incomingPayload.login };
  const token = jwt.sign(outcomingPayload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });

  sendSuccessfulResponse(req, res, { token });
});

export default router;
