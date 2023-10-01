import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty()
  interview_id: number;
  @ApiProperty()
  performance_rating: number;
  @ApiProperty()
  knowledge_depth_rating: number;
  @ApiProperty()
  confidence_rating: number;
  @ApiProperty()
  communication_skill_rating: number;
  @ApiProperty()
  strength: string;
  @ApiProperty()
  area_of_improvements: string;
  @ApiProperty()
  suggestions: string;
}
