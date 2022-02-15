import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class BookGenreInput {
  @Field()
  readonly genreId: number;
  @Field()
  readonly bookId: number;
}
