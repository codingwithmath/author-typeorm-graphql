import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Author from '../db/models/author.entity';
import RepoService from '../repo.service';
import AuthorInput from './input/author.input';

@Resolver(Author)
export default class AuthorResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Author])
  public async authors(): Promise<Author[]> {
    return this.repoService.authorRepo.find();
  }

  @Query(() => Author, { nullable: true })
  public async author(@Args('id') id: number): Promise<Author> {
    return this.repoService.authorRepo.findOne(id);
  }

  @Mutation(() => Author)
  public async createAuthor(@Args('data') input: AuthorInput): Promise<Author> {
    const author = this.repoService.authorRepo.create({ name: input.name });

    return this.repoService.authorRepo.save(author);
  }
}
