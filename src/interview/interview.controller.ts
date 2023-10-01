import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { InterviewService } from './interview.service';
import {
  CreateInterviewDto,
  KhaltiResponse,
  PayForInterViewDto,
} from './dto/create-interview.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApplicantResponse, InterviewerResponse } from './interview.response';
import { InterviewerService } from 'src/interviewer/interviewer.service';

import axios from 'axios';
import { ApplicantService } from 'src/applicant/applicant.service';

const KHALTI_URL = 'https://a.khalti.com/api/v2';
const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(
    private readonly interviewService: InterviewService,
    private readonly interviewerService: InterviewerService,
    private readonly applicantService: ApplicantService,
  ) {}

  @Post()
  create(@Body() createInterviewDto: CreateInterviewDto) {
    return this.interviewService.create(createInterviewDto);
  }

  @Post('pay-for-interview')
  @ApiOkResponse({ type: KhaltiResponse })
  async payForInterview(@Body() payForInterviewDto: PayForInterViewDto) {
    try {
      const session = await this.interviewService.getInterviewById(
        payForInterviewDto.session_id,
      );

      const label = `One on One Interview Session  ${session.interviewer.user.name} x ${session.applicant.user.name}`;
      const price = (session.interviewer.price ?? 500) * 100;
      const data = {
        return_url: 'https://localhost:3000/applicant/payment-success/',
        website_url: 'https://localhost:3000',
        amount: price,
        purchase_order_id: 'test12',
        purchase_order_name: label,
        customer_info: {
          name: session.applicant.user.name,
          email: session.applicant.user.email,
          phone: '9844697839',
        },
        amount_breakdown: [
          {
            label: 'One On One Interview Session',
            amount: price,
          },
        ],
        product_details: [
          {
            identity: '1234567890',
            name: label,
            total_price: price,
            quantity: 1,
            unit_price: price,
          },
        ],
      };

      const headers = {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        'Content-Type': 'application/json',
      };

      try {
        const res = await axios.post(`${KHALTI_URL}/epayment/initiate/`, data, {
          headers,
        });

        return res.data;
      } catch (err) {
        throw new Error(err);
        // console.log('errors', JSON.stringify(err));
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('interviewer-interviews/:interviewer_id')
  @ApiParam({ name: 'interviewer_id', required: true })
  @ApiOkResponse({ type: [InterviewerResponse] })
  getInterviewerInterview(interviewer_id: string) {
    return this.interviewService.getInterviewerInterview(+interviewer_id);
  }

  @Get('applicant_interviewer/:applicant_id')
  @ApiOkResponse({ type: [ApplicantResponse] })
  getApplicantInterview(@Param('applicant_id') applicant_id: string) {
    return this.interviewService.getApplicantInterview(+applicant_id);
  }
}
