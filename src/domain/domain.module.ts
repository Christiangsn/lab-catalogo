import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { PurchasesUseCases } from '../data/useCases/purchases/purchases.useCases';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { ProductsUseCases } from 'src/data/useCases/products/products.useCases';
import { InfraModule } from 'src/infra/infra.module';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { CustomerUseCases } from 'src/data/useCases/customers/customersUseCase';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
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
