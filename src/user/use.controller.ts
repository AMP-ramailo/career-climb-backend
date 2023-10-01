// auth.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  NotFoundException,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiOkResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { UpdateUserRoleDto } from './dto/role.dto';
import { User } from './user.entity';
import { UserType } from 'src/helpers/constants';
import { ApplicantService } from 'src/applicant/applicant.service';
import { SelfResponseDto } from './dto/self.dto';
import { InterviewerService } from 'src/interviewer/interviewer.service';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userSevices: UsersService,
    private readonly applicantService: ApplicantService,
    private readonly interviewerService: InterviewerService,
  ) {}

  @Post('change-role')
  @UseGuards(JwtAuthGuard)
  async changeUserRole(
    @Body() updateUserRoleDto: UpdateUserRoleDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    const user = await this.userSevices.findById(userId); // Implement this function to find the user by ID

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Toggle the user's role
    user.role = updateUserRoleDto.role;
    await user.save(); // Save the updated user to the database

    return { message: 'your role updated successfully', user: user };
  }
  @ApiOkResponse({ type: SelfResponseDto, isArray: false })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async self(@Request() req) {
    const userResponse: SelfResponseDto = new SelfResponseDto();

    userResponse.id = req.user.id;
    userResponse.email = req.user.email;
    userResponse.name = req.user.name;
    userResponse.image_url = req.user.image_url;
    userResponse.role = req.user.role;
    userResponse.createAt = req.user.createdAt;
    userResponse.updateAt = req.user.updateAt;

    if (req.user.role == UserType.USER) {
      const applicantProfile = await this.applicantService.getPersonalProfile(
        req.user.id,
      );
      if (applicantProfile) {
        userResponse.hasProfile = true;
      } else {
        userResponse.hasProfile = false;
      }
    } else {
      const profile = await this.interviewerService.getPersonalProfile(
        req.user.id,
      );
      if (profile) {
        userResponse.hasProfile = true;
      } else {
        userResponse.hasProfile = false;
      }
    }

    return userResponse;
  }
  // @ApiOkResponse({ type: User, isArray: true })
  // @Get('applicant')
  // @UseGuards(JwtAuthGuard)
  // async getApplicant(@Request() req) {
  //   const user = await this.userSevices.getUsersRoleUser();

  //   return   user ;
  // }
  // @ApiOkResponse({ type: User, isArray: true })
  // @Get('interviewer')
  // @UseGuards(JwtAuthGuard)
  // async getInterviewer(@Request() req) {
  //   const user = await this.userSevices.getUsersRoleInterviewer();

  //   return   user ;
  // }
}
