import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/infra/gateways/prisma/prisma.service';

import slugify from 'slugify';

type InputCreateProducts = {
  title: string;
};

@Injectable()
export class ProductsUseCases {
  constructor(private readonly prisma: PrismaService) {}

  public async listAllProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  public async createProduct({ title }: InputCreateProducts): Promise<Product> {
    const slug = slugify(title, {
      lower: true,
    });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists.');
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }

  public async findProductById(id: string) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }
}
