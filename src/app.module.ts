import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';
import AuthorResolver from './resolvers/author.resolver';
import BookGenreResolver from './resolvers/book-genre.resolver';
import BookResolver from './resolvers/book.resolver';
import GenreResolver from './resolvers/genre.resolver';

const graphQLImports = [
  AuthorResolver,
  BookResolver,
  GenreResolver,
  BookGenreResolver,
];

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RepoModule,
    ...graphQLImports,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
