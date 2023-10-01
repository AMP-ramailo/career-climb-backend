import { ApiProperty } from '@nestjs/swagger';
import { APP_PIPE } from '@nestjs/core';

export class AllSkillResponse {
  @ApiProperty()
  skill_id: number;
  @ApiProperty()
  skill_name: string;
}

export class Skill {
  @ApiProperty()
  skill_name: string;
}
export class UserSkillResponse {
  @ApiProperty()
  skill_id: number;
  @ApiProperty()
  skill_name: string;
  @ApiProperty()
  skill_experience: number;

  @ApiProperty()
  skill: Skill;
}
