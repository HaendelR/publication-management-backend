import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { BlogPost } from '../entity/post.entity';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(post: PostDto, userId: string): Promise<BlogPost> {
    const posts = this.postRepository.getAll();

    console.log(userId);

    const newPost: BlogPost = {
      id: (posts.length + 1).toString(),
      title: post.title,
      description: post.description,
      createdAt: new Date(),
      userId: userId,
      isDeleted: false,
    };

    posts.push(newPost);
    this.postRepository.save(posts);
    return newPost;
  }

  findAll(): BlogPost[] {
    return this.postRepository.getAll();
  }

  async findById(id: string): Promise<BlogPost | undefined> {
    return this.postRepository.findById(id);
  }

  async update(id: string, post: BlogPost, userId: string, role: string) {
    this.postRepository.update(id, post, userId, role);
  }

  async delete(id: string, userId: string, role: string) {
    this.postRepository.delete(id, userId, role);
  }
}
