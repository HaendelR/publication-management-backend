import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { PostRepository } from './repository/post.repository';
import { DatabaseService } from 'src/database/service/database.service';

@Module({
  providers: [PostService, PostRepository, DatabaseService],
  controllers: [PostController],
})
export class PostModule {}
