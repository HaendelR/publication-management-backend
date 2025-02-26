import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/service/users.service';
import { LoginDto } from '../Dto/login.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async login(userDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(userDto.username);
    if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, id: user.id, role: user.role };
    const token = sign(
      payload,
      this.configService.get<string>('JWT_SECRET', 'ManageBlogPost'),
      { expiresIn: '1h' },
    );

    return { access_token: token };
  }
}
