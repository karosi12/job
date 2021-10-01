import { Module } from '@nestjs/common';
import { Utils } from '../shared/utils';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  providers: [JobService, Utils],
  controllers: [JobController],
})
export class JobModule {}
