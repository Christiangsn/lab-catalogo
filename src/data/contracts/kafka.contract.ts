export interface UIKafkaContract {
  emit: <T>(title: ITopicsKafka, data: T) => Promise<void>;
}

export type ITopicsKafka = 'purchases.new-purchase';
