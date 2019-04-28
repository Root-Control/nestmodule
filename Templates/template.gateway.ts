import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()

export class TemplatesGateway implements OnGatewayInit {
  @WebSocketServer() server;

  constructor() {
    console.log('initializing');
  }

  afterInit() {
  }

  sendTemplatesListFromSocket(templates) {
    return this.server.emit('templates', { message: 'from controller' });
  }

  sendCreatedTemplate(template) {
    return this.server.emit('templateChannel', { template });
  }

  /*
   *  Explicación de proceso
   *  1.- Creamos un socket llamado templates, el cual al ser llamado ejecutará una respuesta
   */
  @SubscribeMessage('templates')
  findAll(client, data) {
    return this.server.emit('templates', { message: 'works' });
  }
}