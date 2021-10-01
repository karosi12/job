import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '../interfaces/job.interface';
import { JobController } from '../job.controller';
import { JobService } from '../job.service';

describe('JobController', () => {
  const id = '232323';
  const jobData: Job = {
    id,
    jobTitle: 'UI/UX',
    description: 'We are looking for a professional UI/UX',
    location: 'Berlin',
  };
  const res = {
    status: jest.fn(() => {
      return {
        send: jest.fn(() => {
          return jobData;
        }),
      };
    }),
  };

  const listRes = {
    status: jest.fn(() => {
      return {
        send: jest.fn(() => {
          return [jobData];
        }),
      };
    }),
  };

  let controller: JobController;
  const mockJobService = {
    findAll: jest.fn((data: Job) => {
      return [{ ...data }];
    }),
    create: jest.fn(() => jobData),
    delete: jest.fn(() => jobData),
    find: jest.fn((data: Job) => {
      return { ...data };
    }),
    update: jest.fn((id: string, data: Job) => {
      return { ...data };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [JobService],
    })
      .overrideProvider(JobService)
      .useValue(mockJobService)
      .compile();

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a job', () => {
    expect(controller.create(jobData, res)).toMatchObject<Job>(jobData);
  });

  it('should fetch jobs', () => {
    expect(controller.findAll(listRes)).toMatchObject<Job[]>([jobData]);
  });

  it('should update a jobs', () => {
    expect(controller.update(jobData, '1234', res)).toMatchObject<Job>({
      ...jobData,
    });
  });

  it('should delete a job', () => {
    expect(controller.delete(id, res)).toMatchObject<Job>(jobData);
  });
});
