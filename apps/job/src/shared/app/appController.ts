import HttpStatusCode from '../models/HttpStatusCode';
import DPResponse from '../models/Response';
import validate from '../utils/validations/validator';

const sendSuccess = ({ res, data = {}, message = 'Request successful' }) => {
  const status = HttpStatusCode.SUCCESS;
  return res.status(status).send(new DPResponse({ data, message, status }));
};

const sendCreated = ({ res, data = {}, message = 'Record created' }) => {
  const status = HttpStatusCode.CREATED;
  return res.status(status).send(new DPResponse({ data, message, status }));
};

const sendError = ({
  res,
  errors = {},
  message = 'Invalid requests',
  status = HttpStatusCode.INVALID_REQUEST,
}) => {
  return res
    .status(status)
    .send(new DPResponse({ data: {}, message, errors, status }));
};

export { sendError, sendSuccess, sendCreated, validate };
