import { AuthorizationGuard } from '../../../domain/middlewares/authorization.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Product } from '../models/product.model';
import { ProductsUseCases } from 'src/data/useCases/products/products.useCases';
import { CreateProductInput } from '../inputs/createProduct.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsUseCases: ProductsUseCases) {}

  @Query(() => [Product]) // dentro dos conchetes graphql entende que e uma lista de  products
  // @UseGuards(AuthorizationGuard)
  // Retornar todos os productos
  public async products() {
    return this.productsUseCases.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  public async createProduct(
    @Args('data') data: CreateProductInput,
  ): Promise<Product> {
    return this.productsUseCases.createProduct(data);
  }
}
