import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  BulkCreateScheduleDto,
  CreateScheduleDto,
} from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { Op } from 'sequelize';

@Injectable()
export class ScheduleService {
  constructor() {}
  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const check = await Schedule.count({
        where: {
          interviewer_id: createScheduleDto.interviewer_id,
          availability_date: createScheduleDto.availability_date,
          availability_time: {
            [Op.between]: [
              createScheduleDto.availability_time - 100,
              createScheduleDto.availability_time + 100,
            ],
          },
        },
      });
      if (check > 0)
        throw new ForbiddenException(
          'Availability time coincides with another schedule',
        );
      return await Schedule.create(createScheduleDto);
    } catch (error) {
      throw error;
    }
  }

  async bulkCreate(bulkCreateScheduleDto: BulkCreateScheduleDto) {
    try {
      const { data } = bulkCreateScheduleDto;
      // TODO: Check for validations

      return await Schedule.bulkCreate(data);
    } catch (error) {
      throw error;
    }
  }

  async findAll(interviewer_id: number) {
    return await Schedule.findAll({
      where: {
        interviewer_id,
      },
    });
  }

  async findOne(id: number) {
    return await Schedule.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number) {
    return `This action updates a #${id} schedule`;
  }

  async remove(id: number) {
    return await Schedule.destroy({
      where: {
        id,
      },
    });
  }
}
