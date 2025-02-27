import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repository/user.repository';
import { User, UserRole } from '../entity/user.entity';

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
      id: uuidv4(),
      username: user.username,
      password: hashedPassword,
      role: UserRole.ADMIN,
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
