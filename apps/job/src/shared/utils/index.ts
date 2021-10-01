import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
Injectable();
export class Utils {
  getIndex(id: string, data: Array<{ id: string }>): number {
    return data.findIndex((item) => item.id === id);
  }

  generateId(): string {
    return uuidv4();
  }
}
