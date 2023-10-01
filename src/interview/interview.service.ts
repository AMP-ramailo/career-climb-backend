import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { Interview } from './entities/interview.entity';
import { Applicant } from 'src/applicant/entities/applicant.entity';
import { User } from 'src/user/user.entity';
import { Interviewer } from 'src/interviewer/entities/interviewer.entity';

@Injectable()
export class InterviewService {
  async create(createInterviewDto: CreateInterviewDto) {
    console.log('create', createInterviewDto);

    return await Interview.create(createInterviewDto);
  }

  async getInterviewerInterview(interviewer_id: number) {
    return await Interview.findAll({
      where: {
        interviewer_id,
      },
      attributes: { exclude: ['payment_id', 'applicant_id'] },
      include: {
        model: Applicant,
        attributes: [
          'github_url',
          'linkedin_url',
          'current_company',
          'experience',
        ],
        include: [{ model: User, attributes: ['name', 'image_url'] }],
      },
    });
  }

  async getApplicantInterview(applicant_id: number) {
    return await Interview.findAll({
      where: {
        applicant_id,
      },
      attributes: { exclude: ['payment_id', 'interviewer_id'] },
      include: {
        model: Interviewer,
        attributes: ['current_company', 'experience'],
        include: [{ model: User, attributes: ['name', 'image_url'] }],
      },
    });
  }

  update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return `This action updates a #${id} interview`;
  }

  remove(id: number) {
    return `This action removes a #${id} interview`;
  }
}
