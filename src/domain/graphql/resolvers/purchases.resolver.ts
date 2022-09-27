import { Purchase } from './../models/purchase.model';
import { PurchasesUseCases } from './../../../app/useCases/purchases/purchases.useCases';
import { AuthorizationGuard } from '../../../domain/middlewares/authorization.guard';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsUseCases } from 'src/app/useCases/products/products.useCases';
import { CreatePurchaseInput } from '../inputs/createPurchase.input';
import {
  AuthUser,
  CurrentUser,
} from 'src/domain/middlewares/currentUser.decorator';
import { CustomerUseCases } from 'src/app/useCases/customers/customersUseCase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesUseCase: PurchasesUseCases,
    private productsUseCases: ProductsUseCases,
    private customersUseCases: CustomerUseCases,
  ) {}

  //TO:DO Resolver problema de implementacao de interface
  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  public async purchases() {
    return this.purchasesUseCase.listAllPurchases();
  }

  @ResolveField()
  public async product(@Parent() purchase: Purchase) {
    return await this.productsUseCases.findProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  public async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersUseCases.findCustomerByAuthId(user.sub);

    if (!customer) {
      customer = await this.customersUseCases.createCustomer({
        authUserId: user.sub,
      });
    }

    return await this.purchasesUseCase.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
