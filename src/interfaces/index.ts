export interface ErrorWithStatusCode extends Error {
  status: number;
}

export * from './user.interface.js';
export * from './group.interface.js';
