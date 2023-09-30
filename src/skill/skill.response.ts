import { ApiProperty } from '@nestjs/swagger';

export class AllSkillResponse {
  @ApiProperty()
  skill_id: number;
  @ApiProperty()
  skill_name: string;
}

export class UserSkillResponse {
  @ApiProperty()
  skill_id: number;
  @ApiProperty()
  skill_name: string;
  @ApiProperty()
  skill_experience: string;
}
