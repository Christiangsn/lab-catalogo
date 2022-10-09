import { PurchasesUseCases } from '../../../data/useCases/purchases/purchases.useCases';
import { AuthorizationGuard } from '../../../domain/middlewares/authorization.guard';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Customer } from '../models/customer.model';
import { CustomerUseCases } from 'src/data/useCases/customers/customersUseCase';
import {
  AuthUser,
  CurrentUser,
} from 'src/domain/middlewares/currentUser.decorator';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersUseCases: CustomerUseCases,
    private purchasesUseCases: PurchasesUseCases,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  public async me(@CurrentUser() user: AuthUser) {
    return this.customersUseCases.findCustomerByAuthId(user.sub);
  }

  @ResolveField()
  public async purchases(@Parent() customer: Customer) {
    return this.purchasesUseCases.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  public async resolveReference(referente: { authUserId: string }) {
    return this.customersUseCases.findCustomerByAuthId(referente.authUserId);
  }
}
