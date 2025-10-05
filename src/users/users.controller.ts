import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('mentors')
  getAllMentors() {
    return this.usersService.findAllMentors();
  }

  @Post('register/mentor')
  createMentor(@Body() dto: AuthDto) {
    return this.usersService.create(dto, 'MENTOR');
  }

  @HttpCode(200)
  @Put(':id')
  editUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.usersService.editUser(id, userData);
  }

  @HttpCode(200)
  @Post(':id/deactivate')
  deactivateUser(@Param('id') userId: string) {
    return this.usersService.changeActivation(userId, false);
  }

  @HttpCode(200)
  @Post(':id/activate')
  activateUser(@Param('id') userId: string) {
    return this.usersService.changeActivation(userId, true);
  }

  @HttpCode(200)
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.deleteById(userId);
  }

  @HttpCode(200)
  @Get('students')
  getStudents() {
    return this.usersService.findAllStudents();
  }

  @HttpCode(201)
  @Post('register')
  createStudent(@Body() dto: AuthDto) {
    return this.usersService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  getStudentById(@Param('id') userId: string) {
    return this.usersService.getById(userId);
  }

  @HttpCode(200)
  @Post('changePass')
  changePass(@Body() newPasswordDto: ChangePasswordDto) {
    return this.usersService.editPassword(newPasswordDto);
  }
}
