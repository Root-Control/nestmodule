import {
  UnauthorizedException,
  NestMiddleware, 
  Injectable, 
  Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types } from 'mongoose';
import { ITemplate } from '../../templates/interfaces/template.interface';
import { MESSAGES, TEMPLATE_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
/**
 *  Template By Id Middleware
 *  We validating if the Id provided is valid, and returning the found template in the variable req.template
 */
export class TemplateIdMiddleware implements NestMiddleware {
  constructor(@Inject(TEMPLATE_MODEL_TOKEN) private readonly templateModel: Model<ITemplate>) {}
  async use(req, res, next: Function) {
      if(!Types.ObjectId.isValid(req.params.templateId)) return next(new UnauthorizedException('Invalid identifier'));
      const template = await this.templateModel.findById(req.params.templateId);
      if (template) {
        req.template = template;
        next();
      }
      else return next(new UnauthorizedException('No template with that identifier has been found'));
  }
}
