import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../../database/service/database.service';
import { User, UserRole } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  private readonly dbName: string;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {
    this.dbName = this.configService.get<string>('DB_NAME_USERS', 'users');
  }

  getAll(): User[] {
    const result = this.databaseService.getAll(this.dbName) as {
      users?: User[];
    };
    return result?.users || [];
  }

  save(users: User[]) {
    this.databaseService.save({ users }, this.dbName);
  }

  findByUsername(username: string): User | undefined {
    return this.getAll().find((user) => user.username === username);
  }

  findById(id: string): User | undefined {
    return this.getAll().find((user) => user.id === id);
  }

  updateUserRole(
    id: string,
    userRole: { role: UserRole },
    roleConnected: string,
  ) {
    const userToUpdate = this.findById(id);
    if (roleConnected !== 'admin') return;

    if (userToUpdate) userToUpdate.role = userRole.role;

    const newList = this.getAll().map((p) => (p.id === id ? userToUpdate : p));
    this.save(newList as User[]);
  }
}
