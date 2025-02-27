import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Matches, MinLength } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class User {
  @IsString()
  @ApiProperty({ example: 'dae628ba-db02-4318-b276-dbdf9b82bb08' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Jean' })
  username: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must contain at least 6 characters',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*\d)/, {
    message: 'Password must contain at least one digit',
  })
  @Matches(/(?=.*[\W_])/, {
    message: 'Password must contain at least one special character',
  })
  @ApiProperty({
    example: 'P@ssw0rd',
    minLength: 6,
    description:
      'Must contain at least one lowercase, one uppercase, one number and one special character',
  })
  password: string;

  @ApiProperty({ example: UserRole.ADMIN, enum: UserRole })
  @IsEnum(UserRole, { message: 'Role shoud be USER or ADMIN ' })
  role: UserRole;
}
