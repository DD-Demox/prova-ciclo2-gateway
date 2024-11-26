import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { NovaFila } from './interface/nova-fila';

@Controller()
export class AppController {
  private clienteAdminBackend: ClientProxy
  constructor(private readonly appService: AppService) {
    this.clienteAdminBackend = ClientProxyFactory.create({
      transport:Transport.RMQ,
      options:{
        urls: ['amqp://admin:123456@10.136.62.152:5672/provaciclo2'],
        queue: 'fila-banco'
      }
    })

  }

  @Get()
  async getHello() {
    return await this.clienteAdminBackend.emit("ola","ola");
  }

  @Post('adicionar-fila')
  async adicionarNaFila(@Body() novaFila:NovaFila){
    return await this.clienteAdminBackend.emit('adicionar-fila',novaFila)
  }
}
