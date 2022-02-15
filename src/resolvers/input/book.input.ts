import { InputType, Field } from '@nestjs/graphql';
import AuthorInput from './author.input';

@InputType()
class BookAuthorConnectInput {
  @Field()
  readonly id: number;
}

@InputType()
class BookAuthorInput {
  @Field({ nullable: true })
  readonly connect: BookAuthorConnectInput;

  @Field({ nullable: true })
  readonly create: AuthorInput;
}

@InputType()
export default class BookInput {
  @Field()
  readonly title: string;

  @Field()
  readonly author: BookAuthorInput;
}
