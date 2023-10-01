import { Injectable } from '@nestjs/common';
import { CreateInterviewerDto } from './dto/create-interviewer.dto';
import { UpdateInterviewerDto } from './dto/update-interviewer.dto';
import { Interviewer } from './entities/interviewer.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class InterviewerService {
  async create(createInterviewerDto: CreateInterviewerDto) {
    try {
      return await Interviewer.create(createInterviewerDto);
    } catch (error) {
      throw error;
    }
  }

  async getAllInterviewers() {
    try {
      return await Interviewer.findAll({
        attributes: { exclude: ['phone', 'dob'] },
        include: [{ model: User, attributes: ['name', 'image_url'] }],
      });
    } catch (error) {
      throw error;
    }
  }

  async getPersonalProfile(user_id: number) {
    try {
      return await Interviewer.findOne({
        where: { user_id },
        attributes: ['dob', 'address', 'phone', 'price'],
      });
    } catch (error) {
      throw error;
    }
  }

  async getProfile(user_id: number) {
    try {
      return await Interviewer.findOne({
        where: { user_id },
      });
    } catch (error) {
      throw error;
    }
  }
  async getProfileById(id: number) {
    try {
      return await Interviewer.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(user_id: number, updateInterviewerDto: UpdateInterviewerDto) {
    try {
      return await Interviewer.update(
        { ...updateInterviewerDto },
        { where: { user_id } },
      );
    } catch (error) {
      throw error;
    }
  }
}
