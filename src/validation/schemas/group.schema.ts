import Joi from 'joi';

import { GroupDTO } from '../../interfaces/index.js';

export const createOrUpdateGroupSchema: Joi.ObjectSchema<GroupDTO> = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()).unique().required(),
});

export const addUsersToGroupSchema: Joi.ObjectSchema<GroupDTO> = Joi.object({
  userIDs: Joi.array().items(Joi.string().uuid()).required(),
});
