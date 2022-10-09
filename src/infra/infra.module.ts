import { KafkaHelper } from './kafka/helpers/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaService } from './gateways/prisma/prisma.service';
import { KafaService } from './kafka/messaging/kafka.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PrismaService, KafkaHelper, KafaService],
  exports: [PrismaService, KafaService],
})
export class InfraModule {}
