import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackInterviewerDto } from './dto/create-feedback-interviewer.dto';

@Injectable()
export class FeedbackService {
  async feedbackForApplicant(createFeedbackDto: CreateFeedbackDto) {
    try {
      const check = await Feedback.findOne({
        where: {
          interview_id: createFeedbackDto.interview_id,
        },
      });
      if (!check) return await Feedback.create(createFeedbackDto);
      return await Feedback.update(
        { ...createFeedbackDto },
        { where: { interview_id: createFeedbackDto.interview_id } },
      );
    } catch (error) {
      throw error;
    }
  }
  async feedbackForInterviewer(
    createFeedbackDto: CreateFeedbackInterviewerDto,
  ) {
    try {
      const check = await Feedback.findOne({
        where: {
          interview_id: createFeedbackDto.interview_id,
        },
      });
      if (!check) return await Feedback.create(createFeedbackDto);
      return await Feedback.update(
        { ...createFeedbackDto },
        { where: { interview_id: createFeedbackDto.interview_id } },
      );
    } catch (error) {
      throw error;
    }
  }

  async allFeedbackInterviewer(interviewer_id: number) {
    try {
      const allFeedback = (
        await Feedback.sequelize.query(
          `SELECT F."interviewer_rating",F."interviewer_remarks" FROM FEEDBACK F LEFT JOIN INTERVIEW I ON F."interview_id"=I."session_id where I."interviewer_id"=${interviewer_id};`,
        )
      )[0];

      return allFeedback;
    } catch (error) {
      throw error;
    }
  }

  async allFeedbackApplicant(applicant_id: number) {
    try {
      const allFeedback = (
        await Feedback.sequelize.query(
          `SELECT F."performance_rating",F."knowledge_depth_rating",F."confidence_rating",F."communication_skill_rating",F."strength",F."area_of_improvements",F."suggestions" FROM FEEDBACK F LEFT JOIN INTERVIEW I ON F."interview_id"=I."session_id where I."applicant_id"=${applicant_id};`,
        )
      )[0];
      return allFeedback;
    } catch (error) {
      throw error;
    }
  }
}
