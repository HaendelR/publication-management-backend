import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({
    example: 'P@ssw0rd',
    minLength: 6,
    description:
      'Must contain at least one lowercase, one uppercase, one number and one special character',
  })
  password: string;
}
