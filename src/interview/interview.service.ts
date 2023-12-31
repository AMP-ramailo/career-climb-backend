import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
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
      attributes: { exclude: ['applicant_id'] },
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
  async getInterviewById(session_id: number) {
    return await Interview.findOne({
      where: {
        session_id,
      },
      include: [
        {
          model: Applicant,
          attributes: [
            'phone',
            'github_url',
            'linkedin_url',
            'current_company',
            'experience',
          ],
          include: [
            { model: User, attributes: ['name', 'image_url', 'email'] },
          ],
        },
        {
          model: Interviewer,
          attributes: ['price'],
          include: [{ model: User, attributes: ['name'] }],
        },
      ],
    });
  }

  async getApplicantInterview(applicant_id: number) {
    return await Interview.findAll({
      where: {
        applicant_id,
      },
      attributes: { exclude: ['interviewer_id'] },
      include: {
        model: Interviewer,
        attributes: ['current_company', 'experience'],
        include: [{ model: User, attributes: ['name', 'image_url'] }],
      },
    });
  }

  async updatePaymentMethod(session_id: number) {
    return await Interview.update(
      {
        payment_id: 'COMPLETED', // todo: kaam chalaau
      },
      {
        where: {
          session_id,
        },
      },
    );
  }
  update(id: number) {
    return `This action updates a #${id} interview`;
  }

  remove(id: number) {
    return `This action removes a #${id} interview`;
  }
}
