// auth.controller.ts
import { Controller, Post,Get, Body,Request, NotFoundException, UseGuards, UnauthorizedException  } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiOkResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { UpdateUserRoleDto } from './role.dto';
import { User } from './user.entity';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userSevices: UsersService) {}

  @Post('change-role')
  @UseGuards(JwtAuthGuard)
  async changeUserRole(@Body() updateUserRoleDto:UpdateUserRoleDto,@Request() req) {
    console.log('User ID:', req.user.id);
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
  @ApiOkResponse({ type: User, isArray: false })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async self(@Request() req) {
    const user = await this.userSevices.findById(req.user.id);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return   user ;
  }
}
