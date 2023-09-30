import { Test, TestingModule } from '@nestjs/testing';
import { InterviewerController } from './interviewer.controller';
import { InterviewerService } from './interviewer.service';

describe('InterviewerController', () => {
  let controller: InterviewerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewerController],
      providers: [InterviewerService],
    }).compile();

    controller = module.get<InterviewerController>(InterviewerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
