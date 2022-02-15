import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import BookGenre from '../db/models/book-genre.entity';
import RepoService from '../repo.service';
import BookGenreInput from './input/book-genre.input';

@Resolver(BookGenre)
export default class BookGenreResolver {
  constructor(private readonly repoService: RepoService) {}

  @Mutation(() => BookGenre)
  public async createBookGenre(
    @Args('data') input: BookGenreInput,
  ): Promise<BookGenre> {
    const bookGenre = this.repoService.bookGenreRepo.create(input);

    return this.repoService.bookGenreRepo.save(bookGenre);
  }

  @Query(() => [BookGenre])
  public async bookGenres(): Promise<BookGenre[]> {
    return this.repoService.bookGenreRepo.find();
  }

  @Query(() => BookGenre, { nullable: true })
  public async bookGenre(@Args('id') id: number) {
    return this.repoService.bookGenreRepo.findOne(id);
  }
}
