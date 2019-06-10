import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database';
import { TemplatesController } from './templates.controller';
import { templateProviders } from './templates.providers';
import { TemplatesService } from './templates.service';

import { TemplateByIdMiddleware } from './middlewares/singularTemplateById.middleware';
//  Middlewares
import { TemplateValidatorMiddleware } from '../templates/middlewares/singularTemplate-validator.middleware';

import { AppGateway } from '../../app.gateway';

@Module({
    imports: [DatabaseModule],
    controllers: [TemplatesController],
    providers: [
        ...templateProviders,
        TemplatesService,
        AppGateway
    ],
    exports: [
        ...templateProviders
    ]
})
export class TemplatesModule implements NestModule {
    constructor() {
        console.log('Templates module loaded');
    }
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TemplateValidatorMiddleware)
            .forRoutes({ path: 'templates', method: RequestMethod.POST });

        consumer.apply(TemplateByIdMiddleware)
            .forRoutes({ path: 'templates/:templateId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
