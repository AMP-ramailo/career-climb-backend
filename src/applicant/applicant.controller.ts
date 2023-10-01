import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import {
  CreateApplicantDto,
  GetApplicantDto,
} from './dto/create-applicant.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  PersonalProfileResponse,
  SocialProfileResponse,
} from './applicant.response';

@ApiTags('applicant-profile')
@Controller('applicant-profile')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  async create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantService.create(createApplicantDto);
  }

  @Get('get-profile/:user_id')
  @ApiParam({ name: 'user_id', required: true })
  @ApiOkResponse({ type: GetApplicantDto })
  async getProfile(@Param('user_id') user_id: string) {
    return this.applicantService.getProfile(+user_id);
  }

  @Get('get-social/:user_id')
  @ApiParam({ name: 'user_id', required: true })
  @ApiOkResponse({ type: SocialProfileResponse })
  async getSocial(@Param('user_id') user_id: string) {
    return this.applicantService.getSocial(+user_id);
  }

  @Get('get-personal/:user_id')
  @ApiParam({ name: 'user_id', required: true })
  @ApiOkResponse({ type: PersonalProfileResponse })
  async getPersonal(@Param('user_id') user_id: string) {
    return this.applicantService.getPersonalProfile(+user_id);
  }

  @Patch(':user_id')
  @ApiParam({ name: 'user_id', required: true })
  async update(
    @Param('user_id') user_id: string,
    @Body() createApplicationDto: CreateApplicantDto,
  ) {
    return this.applicantService.update(+user_id, createApplicationDto);
  }
}
