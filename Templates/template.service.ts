import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

import { TEMPLATE_MODEL_TOKEN, SERVER_CONFIG } from '../../server.constants';
import { ITemplate } from './interfaces/singularTemplate.interface';
import { getErrorMessage } from '../../common/helpers/error-handler';

@Injectable()
export class TemplatesService {
  constructor(@Inject(TEMPLATE_MODEL_TOKEN) private readonly templateModel: Model<ITemplate>) {}

  async create(template) {
    try {
      return await this.templateModel.create(template);
    } catch (ex) {
      throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async list() {
    try {
      return await this.templateModel.find();
    } catch (ex) {
      throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
    }    
  }

  async update(template, body) {
  	template.title = body.templateName;
    try {
      return await template.save();
    } catch (ex) {
      throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
    }  
  }

  async patch(template, body) {
    try {
      return await template.updateAttributes(body);
    } catch (ex) {
      throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
    }     
  }

  async delete(template) {
    try {
      return await template.remove();
    } catch (ex) {
      throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
    }      
  }
}
