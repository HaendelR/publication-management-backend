import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class User {
  id: string;

  @IsString()
  @ApiProperty({ example: 'Jean' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'password', minLength: 6 })
  @MinLength(6, {
    message: 'Possword must be contains 6 character',
  })
  password: string;

  @ApiProperty({ example: UserRole.ADMIN, enum: UserRole })
  @IsEnum(UserRole, { message: 'Role shoud be USER or ADMIN ' })
  role: UserRole;
}
