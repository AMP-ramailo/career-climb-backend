import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty()
  skill_name: string;
  @ApiProperty()
  user_id?: number;
  @ApiProperty()
  skill_experience?: number;
}
