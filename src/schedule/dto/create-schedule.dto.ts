import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty()
  availability_date: Date;
  @ApiProperty()
  availability_time: number;
  @ApiProperty()
  status?: boolean;
  @ApiProperty()
  interviewer_id?: number;
}

export class BulkCreateScheduleDto {
  @ApiProperty({ type: [CreateScheduleDto] })
  data: CreateScheduleDto[];
}
