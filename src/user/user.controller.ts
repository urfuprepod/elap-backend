import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users2')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get()
  getUsers() {
    // return ['шапка 228']
    return this.userService.findAllUsers();
  }

  @HttpCode(200)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @HttpCode(200)
  @Get('students')
  getStudents() {
    return this.userService.findAllStudents();
  }

  @HttpCode(200)
  @Get('mentors')
  getMentors() {
    return this.userService.findAllMentors();
  }

  @HttpCode(200)
  @Get('admins')
  getAdmins() {
    return this.userService.findAllAdmins();
  }

  @HttpCode(200)
  @Post('changePass')
  changePass(@Body() newPassword: string, @CurrentUser('id') userId: number) {
    return this.userService.editPassword(userId, newPassword);
  }

  @HttpCode(200)
  @Put(':id')
  editUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.userService.editUser(id, userData);
  }

  @HttpCode(200)
  @Post(':id/deactivate')
  deactivateUser(@Param('id') userId: string) {
    return this.userService.changeActivation(userId, false);
  }

  @HttpCode(200)
  @Post(':id/activate')
  activateUser(@Param('id') userId: string) {
    return this.userService.changeActivation(userId, true);
  }

  @HttpCode(200)
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteById(userId);
  }
}
