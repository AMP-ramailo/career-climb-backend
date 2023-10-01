import { ApiProperty } from '@nestjs/swagger';

export class CreateInterviewDto {
  @ApiProperty()
  interview_date: Date;

  @ApiProperty()
  interview_time: number;

  @ApiProperty()
  interview_status: string;

  @ApiProperty()
  payment_id: string;

  @ApiProperty()
  interviewer_id: number;

  @ApiProperty()
  applicant_id: number;
}
export class PayForInterViewDto {
  @ApiProperty()
  session_id: number;
}

export class CheckForPaymentDto {
  @ApiProperty()
  session_id: number;

  @ApiProperty()
  pidx: string;
}
export class KhaltiResponse {
  @ApiProperty()
  pidx: string;

  @ApiProperty()
  payment_url: string;

  @ApiProperty()
  expires_at: string;

  @ApiProperty()
  expires_in: string;
}
