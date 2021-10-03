import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JobDto } from '../../job/dto/job.dto';

Injectable();
export class Utils {
  getIndex(id: string, data: Array<{ id: string }>): number {
    return data.findIndex((item) => item.id === id);
  }

  generateId(): string {
    return uuidv4();
  }
  valiateCreate(data: JobDto): boolean {
    for (const item in data) {
      if (!data[item]) return false;
    }
    return true;
  }
}
