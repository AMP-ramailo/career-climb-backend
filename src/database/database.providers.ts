import { Sequelize } from 'sequelize-typescript';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../helpers';
import { databaseConfig } from './database.config';
import { User } from '../user/user.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Applicant } from 'src/applicant/entities/applicant.entity';
import { Interviewer } from 'src/interviewer/entities/interviewer.entity';
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Schedule, Applicant, Interviewer]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
