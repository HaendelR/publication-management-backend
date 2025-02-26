import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ example: 'Recrutement' })
  title: string;

  @ApiProperty({ example: 'Description du poste' })
  description: string;
}
