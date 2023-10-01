import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { UserSkill } from 'src/helpers/linking_entities/user-skill.entity';
import { skillData } from './skill.seeder';
import { User } from 'src/user/user.entity';

@Injectable()
export class SkillService {
  async create(createSkillDto: CreateSkillDto) {
    try {
      let checker = await Skill.findOne({
        where: { skill_name: createSkillDto.skill_name },
        attributes: ['skill_id'],
      });
      if (!checker) {
        checker = await Skill.create({
          skill_name: createSkillDto.skill_name,
        });
      }
      await UserSkill.create({
        skill_id: checker.skill_id,
        user_id: createSkillDto.user_id,
        skill_experience: createSkillDto.skill_experience,
      });

      return { skill_name: createSkillDto.skill_name };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await Skill.findAll();
  }

  async findAllSkillOfUser(user_id: number) {
    const allSkills = (
      await UserSkill.sequelize.query(
        `SELECT us.skill_id, s.skill_name, us.skill_experience ` +
          `FROM user_skill us LEFT JOIN skills s ON us.skill_id = s.skill_id ` +
          `where us.user_id=${user_id};`,
      )
    )[0];
    return allSkills;
  }

  async update(skill_id: number, updateSkillDto: UpdateSkillDto) {
    try {
      return await UserSkill.update(
        { skill_experience: updateSkillDto.skill_experience },
        {
          where: {
            user_id: updateSkillDto.user_id,
            skill_id,
          },
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(user_id: number, skill_id: number) {
    return await UserSkill.destroy({
      where: {
        user_id,
        skill_id,
      },
    });
  }

  async seedData() {
    try {
      const skillCount = await Skill.count();
      if (skillCount == 0) await Skill.bulkCreate(skillData);
    } catch (error) {
      console.log('Failed to seed data.', error);
    }
  }
}
