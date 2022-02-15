import {
  Args,
  Mutation,
  Parent,
  Resolver,
  Query,
  ResolveField,
} from '@nestjs/graphql';
import Author from '../db/models/author.entity';
import Book from '../db/models/book.entity';
import RepoService from '../repo.service';
import BookInput from './input/book.input';

@Resolver(Book)
export default class BookResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Book])
  public async books(): Promise<Book[]> {
    return this.repoService.bookRepo.find();
  }

  @ResolveField()
  public async author(@Parent() parent): Promise<Author> {
    return this.repoService.authorRepo.findOne(parent.authorId);
  }

  @Mutation(() => Book)
  public async createBook(@Args('data') input: BookInput): Promise<Book> {
    const { author } = input;

    let id;

    if (!author.connect) {
      const createdAuthor: Author = this.repoService.authorRepo.create({
        name: author.create.name,
      });

      await this.repoService.authorRepo.save(createdAuthor);

      id = createdAuthor.id;
    } else {
      id = author.connect.id;
    }

    const book = this.repoService.bookRepo.create({
      title: input.title,
      authorId: id,
    });

    return this.repoService.bookRepo.save(book);
  }
}
