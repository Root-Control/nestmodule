import {
  BadRequestException,
  NestMiddleware, 
  Injectable, 
  Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'joi';
import { templateSchema } from '../../templates/joi/template.joi';

import { Model, Types } from 'mongoose';
import { ITemplate } from '../../templates/interfaces/template.interface';
import { MESSAGES, TEMPLATE_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Template By Id Middleware
 *  We validating if the Id provided is valid, and returning the found template in the variable req.template
 */
export class templateValidatorMiddleware implements NestMiddleware {
  constructor() {
  }
  async use(req, res, next: Function) {
    const result = validate(req.body, templateSchema);

    if (result.error) {
      const errorMessage = result.error.details.shift().message;
      const message: string = errorMessage.replace(/["]/g, '');

      return next(new BadRequestException(`Validation failed: ${message}`));
    }
    next();
  }
}