import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class BlogPost {
  id: string;

  @IsString()
  @ApiProperty({ example: 'Recrutement' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'dae628ba-db02-4318-b276-dbdf9b82bb08' })
  userId: string;

  @IsString()
  @ApiProperty({ example: 'Description du poste' })
  description: string;

  @IsDate()
  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @IsBoolean()
  @ApiProperty({ example: true })
  isDeleted: boolean;
}
