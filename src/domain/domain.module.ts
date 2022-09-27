import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { PurchasesUseCases } from './../app/useCases/purchases/purchases.useCases';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { ProductsUseCases } from 'src/app/useCases/products/products.useCases';
import { InfraModule } from 'src/infra/infra.module';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { CustomerUseCases } from 'src/app/useCases/customers/customersUseCase';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    // UseCases
    ProductsUseCases,
    PurchasesUseCases,
    CustomerUseCases,
  ],
})
export class DomainModule {}
