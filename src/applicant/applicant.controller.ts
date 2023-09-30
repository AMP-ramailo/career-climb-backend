import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('applicant-profile')
@Controller('applicant-profile')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  async create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantService.create(createApplicantDto);
  }

  @Get('get-profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.applicantService.getProfile(+id);
  }

  @Get('get-social/:id')
  async getSocial(@Param('id') id: string) {
    return this.applicantService.getSocial(+id);
  }

  @Get('get-personal/:id')
  async getPersonal(@Param('id') id: string) {
    return this.applicantService.getPersonalProfile(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createApplicationDto: CreateApplicantDto,
  ) {
    return this.applicantService.update(+id, createApplicationDto);
  }
}
