import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User, UserRole } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User): Promise<User> {
    const users = this.userRepository.getAll();

    if (this.userRepository.findByUsername(user.username)) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: User = {
      id: (users.length + 1).toString(),
      username: user.username,
      password: hashedPassword,
      role: UserRole.USER,
    };

    users.push(newUser);
    this.userRepository.save(users);
    return newUser;
  }

  findAll(): User[] {
    return this.userRepository.getAll();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findByUsername(username);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findById(id);
  }
}
