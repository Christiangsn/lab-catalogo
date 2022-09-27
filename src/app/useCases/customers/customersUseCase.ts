import { Injectable } from '@nestjs/common';
import { Customer, Product } from '@prisma/client';
import { PrismaService } from 'src/infra/gateways/prisma/prisma.service';

type InputCreateCustomer = {
  authUserId: string;
};

@Injectable()
export class CustomerUseCases {
  constructor(private readonly prisma: PrismaService) {}

  public async findCustomerByAuthId(authUserId: string): Promise<Customer> {
    return await this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  public async createCustomer({
    authUserId,
  }: InputCreateCustomer): Promise<Customer> {
    return await this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
