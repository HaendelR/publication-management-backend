import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UserRepository } from './repository/user.repository';
import { UsersController } from './controller/users.controller';
import { DatabaseService } from '../../database/service/database.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, UserRepository, DatabaseService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
