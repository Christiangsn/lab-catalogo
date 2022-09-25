import { AuthorizationGuard } from './middlewares/authorization.guard';
import { PrismaService } from './../infra/gateways/prisma/prisma.service';
import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  public async hello() {
    return 'hello world';
  }
}
