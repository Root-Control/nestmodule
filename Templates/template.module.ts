import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { TemplatesController } from './templates.controller';
import { templateProviders } from './templates.providers';
import { TemplatesService } from './templates.service';

import { TemplatesGateway } from './templates.gateway';

import { TemplateIdMiddleware } from './middlewares/singularTemplateById.middleware';
//  Middlewares
import { templateValidatorMiddleware } from '../templates/middlewares/singularTemplate-validator.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [TemplatesController],
  providers: [
    TemplatesGateway,
    ...templateProviders,
    TemplatesService
  ],
  exports: [
    ...templateProviders
  ]
})
export class TemplatesModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(templateValidatorMiddleware)
      .forRoutes({ path: 'templates', method: RequestMethod.POST });

    consumer.apply(TemplateIdMiddleware)
      .forRoutes({ path: 'templates/:templateId', method: RequestMethod.ALL });
      //  users id calling middleware for findById users before run another methods like "delete/update/read"
  }
}
