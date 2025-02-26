import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../../database/service/database.service';
import { BlogPost } from '../entity/post.entity';

@Injectable()
export class PostRepository {
  private readonly dbName: string;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {
    this.dbName = this.configService.get<string>('DB_NAME_POSTS', 'posts');
  }

  getAll(): BlogPost[] {
    const result = this.databaseService.getAll(this.dbName) as {
      posts?: BlogPost[];
    };
    return result?.posts || [];
  }

  save(posts: BlogPost[]) {
    this.databaseService.save({ posts }, this.dbName);
  }

  findById(id: string): BlogPost | undefined {
    return this.getAll().find((post) => post.id === id);
  }

  update(id: string, post: BlogPost, userId: string, role: string) {
    const lastPost = this.findById(id);
    if (lastPost?.id !== userId && role !== 'admin') return;
    const newPost = { ...lastPost, ...post };
    const newList = this.getAll().map((p) => (p.id === id ? newPost : p));
    this.save(newList);
  }

  delete(id: string, userId: string, role: string) {
    const lastPost = this.findById(id);
    if (lastPost?.id !== userId && role !== 'admin') return;
    if (lastPost) lastPost.isDeleted = true;
    const newList = this.getAll().map((p) => (p.id === id ? lastPost : p));
    this.save(newList as BlogPost[]);
  }
}
