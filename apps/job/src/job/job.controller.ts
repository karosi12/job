import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { sendError, sendSuccess, validate } from '../shared/app/appController';
import { jobSchemas } from './validationSchemas/job';
import { JobDto } from './dto/job.dto';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Post()
  create(@Body() jobDto: JobDto, @Res() res: Response) {
    const { errors, data } = validate(jobSchemas.createJobSchema, jobDto);
    if (errors) {
      return sendError({ res, errors });
    }
    const job = this.jobService.create(data);
    if (job) {
      return sendSuccess({ res, data: job });
    }
    return sendError({ res, errors: 'unable to create a job' });
  }

  @Get(':id')
  find(@Param('id') id, @Res() res: Response) {
    const { errors, data } = validate(jobSchemas.paramSchema, { id });
    if (errors) {
      return sendError({ res, errors });
    }
    const job = this.jobService.find(data);
    if (job) {
      return sendSuccess({ res, data: job });
    }
    return sendError({ res, errors: 'unable to fetch record' });
  }

  @Get()
  findAll(@Res() res: Response) {
    const job = this.jobService.findAll();
    if (job) {
      return sendSuccess({ res, data: job });
    }
    return sendError({ res, errors: 'unable to fetch record' });
  }

  @Put(':id')
  update(@Body() jobDto: JobDto, @Param('id') id, @Res() res: Response) {
    const requestData = { id, ...jobDto };
    const { errors, data } = validate(jobSchemas.updateJobSchema, requestData);
    if (errors) {
      return sendError({ res, errors });
    }
    const job = this.jobService.update(data);
    if (job) {
      return sendSuccess({ res, data: job });
    }
    return sendError({ res, errors: 'unable to update record' });
  }

  @Delete(':id')
  delete(@Param('id') id, @Res() res: Response) {
    const { errors, data } = validate(jobSchemas.paramSchema, { id });
    if (errors) {
      return sendError({ res, errors });
    }
    const job = this.jobService.delete(data);
    if (job) {
      return sendSuccess({ res, data: job });
    }
    return sendError({ res, errors: 'unable to remove record' });
  }
}
