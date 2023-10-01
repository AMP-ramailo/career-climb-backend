import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackInterviewerDto {
  @ApiProperty()
  interview_id: number;

  @ApiProperty()
  interviewer_rating: number;
  @ApiProperty()
  interviewer_remarks: string;
}
