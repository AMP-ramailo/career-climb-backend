import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { UserSkill } from 'src/helpers/linking_entities/user-skill.entity';
import { skillData } from './skill.seeder';

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
    const getAll = await UserSkill.findAll({
      where: { user_id },
      attributes: ['skill_id'],
      include: [
        {
          model: Skill,
          attributes: ['skill_name'],
        },
      ],
    });
    return getAll;
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
