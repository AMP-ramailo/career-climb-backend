import * as dotenv from 'dotenv';
dotenv.config();
export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'DEVELOPMENT';
export const TEST = 'TEST';
export const PRODUCTION = 'PRODUCTION';

export enum UserType {
  USER = 'user',
  INTERVIEWER = 'interviewer',
}
