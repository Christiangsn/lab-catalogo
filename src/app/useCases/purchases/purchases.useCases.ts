import { Injectable } from '@nestjs/common';
import { Purchase } from '@prisma/client';
import { PrismaService } from 'src/infra/gateways/prisma/prisma.service';

type InputCreatePurchase = {
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesUseCases {
  constructor(private readonly prisma: PrismaService) {}

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

    return await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}
