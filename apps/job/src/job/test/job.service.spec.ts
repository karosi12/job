import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '../interfaces/job.interface';
import { JobService } from '../job.service';
import { v4 as uuidv4 } from 'uuid';
import { Utils } from '../../shared/utils';
describe('JobService', () => {
  let service: JobService;
  const id = uuidv4();
  const jobData: Job = {
    id,
    jobTitle: 'UI/UX',
    description: 'We are looking for a professional UI/UX',
    location: 'Berlin',
  };

  const mockUtils = {
    generateId: jest.fn(() => uuidv4()),
    getIndex: jest.fn((id: string, data: Array<{ id: string }>) =>
      data.findIndex((item) => item.id === id)
    ),
  };

  beforeEach(async () => {
    delete jobData.id;
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService, Utils],
    })
      .overrideProvider([JobService, Utils])
      .useValue(mockUtils)
      .compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new job', () => {
    expect(service.create(jobData)).toMatchObject(jobData);
  });
  it('should return array of jobs', () => {
    const data = service.findAll();
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('jobTitle');
    expect(data[0]).toHaveProperty('description');
    expect(data[0]).toHaveProperty('location');
  });

  it('should return a job', () => {
    const list = service.findAll();
    const data = service.find({ id: list[0].id });
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('jobTitle');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('location');
  });
  it('should update a job', () => {
    const list = service.findAll();
    const { id } = list[0];
    const data = service.update({ id, ...jobData });
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('jobTitle');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('location');
  });

  it('should delete a job', () => {
    const list = service.findAll();
    const data = service.delete({ id: list[0].id });
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('jobTitle');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('location');
  });
});
