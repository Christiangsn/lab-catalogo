import { Injectable } from '@nestjs/common';
import { Purchase } from '@prisma/client';
import { PrismaService } from 'src/infra/gateways/prisma/prisma.service';
import { KafaService } from 'src/infra/kafka/messaging/kafka.service';

type InputCreatePurchase = {
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesUseCases {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafaService,
  ) {}

  public async listAllPurchases(): Promise<Purchase[]> {
    return await this.prisma.purchase.findMany({
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  public async listAllFromCustomer(customerId: string): Promise<Purchase[]> {
    return await this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  public async createPurchase({ customerId, productId }: InputCreatePurchase) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('product not found.');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    await this.kafkaService.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.id,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
