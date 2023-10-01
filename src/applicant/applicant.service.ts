import { Injectable } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { Applicant } from './entities/applicant.entity';

@Injectable()
export class ApplicantService {
  async create(createApplicantDto: CreateApplicantDto) {
    try {
      return await Applicant.create(createApplicantDto);
    } catch (error) {
      throw error;
    }
  }

  async getPersonalProfile(user_id: number) {
    try {
      return await Applicant.findOne({
        where: { user_id: user_id },
        attributes: ['dob', 'address', 'phone'],
      });
    } catch (error) {
      throw error;
    }
  }

  async getSocial(user_id: number) {
    try {
      return await Applicant.findOne({
        where: { user_id },
        attributes: ['linkedin_url', 'github_url'],
      });
    } catch (error) {
      throw error;
    }
  }

  async getProfile(user_id: number) {
    try {
      return await Applicant.findOne({
        where: { user_id },
      });
    } catch (error) {
      throw error;
    }
  }
  async getProfileById(id: number) {
    try {
      return await Applicant.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(user_id: number, createApplicantDto: CreateApplicantDto) {
    try {
      return await Applicant.update(
        { ...createApplicantDto },
        { where: { user_id } },
      );
    } catch (error) {
      throw error;
    }
  }
}
