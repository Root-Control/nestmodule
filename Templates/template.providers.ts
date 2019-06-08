import { Connection } from 'mongoose';
import { TemplateSchema } from './schemas/singularTemplate.schema';
import { TEMPLATE_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const templateProviders = [
  {
    provide: TEMPLATE_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Template', TemplateSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];
