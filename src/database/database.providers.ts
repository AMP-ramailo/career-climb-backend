import { Sequelize } from 'sequelize-typescript';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../helpers';
import { databaseConfig } from './database.config';
import { User } from '../user/user.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Applicant } from 'src/applicant/entities/applicant.entity';
import { Interviewer } from 'src/interviewer/entities/interviewer.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { UserSkill } from 'src/helpers/linking_entities/user-skill.entity';
import { Interview } from 'src/interview/entities/interview.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
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
      sequelize.addModels([
        User,
        Schedule,
        Applicant,
        Interviewer,
        Skill,
        UserSkill,
        Interview,
        Feedback,
      ]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
