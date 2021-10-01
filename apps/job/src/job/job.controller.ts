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
import { sendError, sendSuccess, validate } from '../shared/app/appController';
import { jobSchemas } from './validationSchemas/job';
import { JobDto } from './dto/job.dto';

@Controller('jobs')
export class JobController {
  @Post()
  create(@Body() jobDto: JobDto, @Res() res: Response) {
    const { errors, data } = validate(jobSchemas.createJobSchema, jobDto);
    if (errors) {
      return sendError({ res, errors });
    }
    return sendSuccess({ res, data });
  }

  @Get(':id')
  find(@Param('id') id, @Res() res: Response) {
    const { errors, data } = validate(jobSchemas.paramSchema, { id });
    if (errors) {
      return sendError({ res, errors });
    }
    return sendSuccess({ res, data });
  }

  @Get()
  findAll(@Res() res: Response) {
    return sendSuccess({ res, data: [] });
  }

  @Put(':id')
  update(@Body() jobDto: JobDto, @Param('id') id, @Res() res: Response) {
    const requestData = { id, ...jobDto };
    const { errors, data } = validate(jobSchemas.updateJobSchema, requestData);
    if (errors) {
      return sendError({ res, errors });
    }
    return sendSuccess({ res, data });
  }

  @Delete(':id')
  delete(@Param('id') id, @Res() res: Response) {
    const { errors, data } = validate(jobSchemas.paramSchema, { id });
    if (errors) {
      return sendError({ res, errors });
    }
    return sendSuccess({ res, data });
  }
}
