import Group from '../models/group.model.js';
import User from '../models/users.model.js';
import UserGroups from '../models/userGroup.model.js';

import { UserDTO } from '../interfaces/index.js';

const usersSeed: (UserDTO & { createdAt: Date; updatedAt: Date })[] = [
  // the unhashed value of a password is written as a comment next to the password field.
  {
    login: 'unfinished_sentenc',
    password: '$2a$10$KWhov6dpU40psGqP2uxYwew81cT6TMu93Sf82u/s5VtJFgXDJ9SdK', // ineedapassword18
    age: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'username_copied',
    password: '$2a$10$X.5v.g7ucu0cc5L.5LiKvOMrZvRtCgFDDjV2MgdqVVUNFSzmltGfq', // iamforgetful19
    age: 19,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'AllGoodNamesRGone',
    password: '$2a$10$FcCL.WUQcBWuyc2rqIgMHOdZzrT7IOCNbevt9vpnMQflYdG7iMvBu', // whydoialwaysforget20
    age: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'anonymouse',
    password: '$2a$10$U.OAUSUL9nXF9Mamt2s0LuyJ5kpu1ITXcaPnoC9l4j.isQHgYQZy6', // YouWontGuessThisOne21
    age: 21,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'BenAfleckIsAnOkActor',
    password: '$2a$10$vsfKJqcfvztwuRTu4avRbOaz9C2FdWSnzM7Bz87NSVAXRrQTFcANe', // iamnottellingyoumypw22
    age: 22,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'test_name_please_ignore',
    password: '$2a$10$Lg3jCjU246Cgq9lpz5UzzeFMu3UUlBCmpAwdd/9cK8eNZCWGT4myO', // yetanotherpassword23
    age: 23,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'LactoseTheIntolerant',
    password: '$2a$10$w16wg4WjJFrQhBoCVYYcS.F5O6iHvZ5vSDwu3/lItXrwMocJi19rK', // nomorepasswords24
    age: 24,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'unfriendme',
    password: '$2a$10$0coQWXqY5nWKoIrWTw3Sae5eamCT.jGTSKb.Z8ius5cJoffS5RIHe', // cantremember25
    age: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'kim_chi',
    password: '$2a$10$6OBC2WR8WsPXcP8YgNEqK.DWFOhKg5QR/7JXbuvvi3C5mvjDhnBQ6', // memorysucks75
    age: 75,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    login: 'just-a-harmless-potato',
    password: '$2a$10$QYBiSNIuXLQTn5M3mu3zAeBkFKNVUU8aWQE3pkGTwjwYaYJoh.1SS', // earlyalzheimers18
    age: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initializeDatabase = async () => {
  await User.sync({});
  await Group.sync({});
  await UserGroups.sync();

  await User.bulkCreate(usersSeed, { ignoreDuplicates: true });
};

initializeDatabase();
