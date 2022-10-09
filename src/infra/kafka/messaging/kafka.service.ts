import { Injectable } from '@nestjs/common';
import {
  ITopicsKafka,
  UIKafkaContract,
} from 'src/data/contracts/kafka.contract';
import { KafkaHelper } from '../helpers/kafka.module';

@Injectable()
export class KafaService implements UIKafkaContract {
  constructor(private readonly kafka: KafkaHelper) {}
  public async emit<T>(title: ITopicsKafka, data: T): Promise<void> {
    this.kafka.emit(title, data);
  }
}
