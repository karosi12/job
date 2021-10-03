import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '../interfaces/job.interface';
import { JobController } from '../job.controller';
import { JobService } from '../job.service';
import { v4 as uuidv4 } from 'uuid';
describe('JobController', () => {
  const id = uuidv4();
  const jobData: Job = {
    id,
    jobTitle: 'UI/UX',
    description: 'We are looking for a professional UI/UX',
    location: 'Berlin',
  };
  const jobEmptyData: Job = {
    id,
    jobTitle: '',
    description: '',
    location: '',
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
  const ErrorRes = {
    status: jest.fn(() => {
      return {
        send: jest.fn(() => {
          return undefined;
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

  it('should create a job - [success]', () => {
    expect(controller.create(jobData, res)).toMatchObject<Job>(jobData);
  });

  it('should create a job - [failure]', () => {
    expect(controller.create(jobEmptyData, ErrorRes)).toEqual<Job>(undefined);
  });

  it('should fetch jobs - [success]', () => {
    expect(controller.findAll(listRes)).toMatchObject<Job[]>([jobData]);
  });

  it('should update a jobs - [success]', () => {
    expect(controller.update(jobData, id, res)).toMatchObject<Job>(jobData);
  });

  it('should update a jobs - [failure]', () => {
    expect(controller.update(jobEmptyData, id, ErrorRes)).toEqual<Job>(
      undefined
    );
  });

  it('should delete a job - [success]', () => {
    expect(controller.delete(id, res)).toMatchObject<Job>(jobData);
  });
  it('should delete a job - [failure]', () => {
    expect(controller.delete(id, ErrorRes)).toEqual<Job>(undefined);
  });
});
