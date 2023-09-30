export class CreateScheduleDto {
  availability_date: Date;
  availability_time: number;
  status?: boolean;
  interviewer_id?: number;
}
