import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async register(user: RegisterDto): Promise<UserEntity> {
    try {
      const { email, password, firstName, lastName } = user;
      const userExists = await this.userRepository.findOne({
        where: { email },
      });
      if (userExists) {
        throw new InternalServerErrorException('user already exists');
      }
      const userEntity = this.userRepository.create({
        email,
        password,
        firstName,
        lastName,
      });
      await this.userRepository.save(userEntity);
      return userEntity;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(user: LoginDto): Promise<any> {
    const { email, password } = user;
    const userEntity = await this.userRepository.findOne({
      where: { email },
    });
    if (!userEntity) {
      throw new UnauthorizedException('invalid credentials');
    }
    const isPasswordValid = await userEntity.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid credentials');
    }
    const { authorizationToken } = await this.tokenService.generateTokens(
      userEntity.id,
    );
    return { authorizationToken };
  }
}
