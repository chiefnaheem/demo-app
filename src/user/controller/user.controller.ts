import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: RegisterDto): Promise<UserEntity> {
    return this.userService.register(user);
  }

  @Post('login')
  async login(@Body() user: LoginDto): Promise<any> {
    return this.userService.login(user);
  }
}
