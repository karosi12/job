import { Injectable } from '@nestjs/common';
import { Utils } from '../shared/utils';
import { Job } from './interfaces/job.interface';
import { JobDto } from './dto/job.dto';
@Injectable()
export class JobService {
  constructor(private readonly utils: Utils) {}
  private readonly jobs: Job[] = [
    {
      id: this.utils.generateId(),
      jobTitle: 'Backend Engineer',
      description: 'We are looking for a professional Backend Engineer',
      location: 'Berlin',
    },
    {
      id: this.utils.generateId(),
      jobTitle: 'Frontend Engineer',
      description: 'We are looking for a professional Frontend Engineer',
      location: 'Hamburg',
    },
  ];

  findAll(): Job[] {
    return this.jobs;
  }

  find(data: { id: string }): Job {
    const { id } = data;
    return this.jobs.find((data) => data.id === id);
  }

  create(data: JobDto): Job {
    const value = { id: this.utils.generateId(), ...data };
    if (this.utils.valiateCreate(value)) {
      this.jobs.unshift(value);
      return value;
    }
    return;
  }

  update(data: JobDto): Job {
    const { id } = data;
    const itemIndex = this.utils.getIndex(id, this.jobs);
    if (itemIndex < 0) {
      return;
    }
    const value = { ...data, id };
    this.jobs.splice(itemIndex, 1, value);
    return value;
  }

  delete(data: { id: string }): Job {
    const { id } = data;
    const itemIndex = this.utils.getIndex(id, this.jobs);
    if (itemIndex < 0) {
      return;
    }
    return this.jobs.splice(itemIndex, 1)[0];
  }
}
