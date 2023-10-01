import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AllSkillResponse, UserSkillResponse } from './skill.response';

@ApiTags('skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  @ApiParam({ name: 'user_id', required: true })
  @ApiOkResponse({ type: [AllSkillResponse] })
  findAll() {
    return this.skillService.findAll();
  }

  @Get('find-skill-of-user/:user_id')
  @ApiParam({ name: 'user_id', required: true })
  @ApiOkResponse({ type: [UserSkillResponse] })
  findOne(@Param('user_id') user_id: string) {
    console.log('hit here');
    return this.skillService.findAllSkillOfUser(+user_id);
  }

  @Patch(':skill_id')
  update(
    @Param('skill_id') skill_id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillService.update(+skill_id, updateSkillDto);
  }

  @Delete(':user_id/:skill_id')
  remove(
    @Param('user_id') user_id: string,
    @Param('skill_id') skill_id: string,
  ) {
    return this.skillService.remove(+user_id, +skill_id);
  }
}
