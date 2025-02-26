import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class DatabaseService {
  private readonly filePath = './src/database/data/';

  private readData(dbName: string): Record<string, any> {
    try {
      const data = fs.readJsonSync(`${this.filePath}${dbName}.json`, {
        throws: false,
      });
      return data || {};
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      return {};
    }
  }

  private writeData(data: any, dbName: string) {
    fs.writeJsonSync(`${this.filePath}${dbName}.json`, data, { spaces: 2 });
  }

  getAll(dbName: string) {
    return this.readData(dbName);
  }

  save(data: any, dbName: string) {
    this.writeData(data, dbName);
  }
}
