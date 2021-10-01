import * as Joi from 'joi';

const jobSchemas = {
  createJobSchema: Joi.object().keys({
    jobTitle: Joi.string()
      .trim(true)
      .required()
      .regex(/^[A-Za-z]/)
      .label('Job title')
      .messages({ 'any.required': 'Job title is required' }),
    description: Joi.string()
      .trim(true)
      .required()
      .regex(/^[A-Za-z]/)
      .label('Description')
      .messages({ 'any.required': 'Description is required' }),
    location: Joi.string()
      .label('location')
      .required()
      .valid('Berlin', 'Hamburg', 'Remote')
      .messages({ 'any.required': 'Location is required' }),
  }),

  updateJobSchema: Joi.object().keys({
    id: Joi.string()
      .guid({ version: 'uuidv4' })
      .trim(true)
      .required()
      .label('id')
      .messages({ 'any.required': 'id is required' }),
    jobTitle: Joi.string()
      .trim(true)
      .required()
      .regex(/^[A-Za-z]/)
      .label('Job title')
      .messages({ 'any.required': 'Job title is required' }),
    description: Joi.string()
      .trim(true)
      .required()
      .regex(/^[A-Za-z]/)
      .label('Description')
      .messages({ 'any.required': 'Description is required' }),
    location: Joi.string()
      .label('location')
      .lowercase()
      .required()
      .valid('berlin', 'hamburg', 'remote')
      .messages({ 'any.required': 'Location is required' }),
  }),

  paramSchema: Joi.object().keys({
    id: Joi.string()
      .guid({ version: 'uuidv4' })
      .trim(true)
      .required()
      .label('id')
      .messages({ 'any.required': 'id is required' }),
  }),

  validateOptions: {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  },
};

export { jobSchemas };
