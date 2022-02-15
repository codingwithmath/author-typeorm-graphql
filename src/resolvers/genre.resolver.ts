import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import Book from '../db/models/book.entity';
import Genre from '../db/models/genre.entity';
import RepoService from '../repo.service';
import GenreInput from './input/genre.input';

@Resolver(Genre)
export default class GenreResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Genre])
  public async genres(): Promise<Genre[]> {
    return this.repoService.genreRepo.find();
  }

  @Query(() => Genre, { nullable: true })
  public async genre(@Args('id') id: number): Promise<Genre> {
    return this.repoService.genreRepo.findOne(id);
  }

  @Mutation(() => Genre)
  public async createGenre(@Args('data') input: GenreInput): Promise<Genre> {
    const genre = this.repoService.genreRepo.create({ name: input.name });

    return this.repoService.genreRepo.save(genre);
  }

  @ResolveField(() => Book)
  public async books(@Parent() genre: Genre): Promise<Book[]> {
    const bookGenres = await this.repoService.bookGenreRepo.find({
      where: {
        genreId: genre.id,
      },
      relations: ['books'],
    });

    const books: Book[] = [];

    bookGenres.forEach(async (bookGenre) => {
      bookGenre.book.forEach((book) => {
        books.push(book);
      });
    });

    return books;
  }
}
