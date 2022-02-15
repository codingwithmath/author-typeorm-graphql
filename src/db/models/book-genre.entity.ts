import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Genre from './genre.entity';
import Book from './book.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'books_genres' })
export default class BookGenre {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @PrimaryColumn({ name: 'book_id' })
  bookId: number;

  @Field()
  @PrimaryColumn({ name: 'genre_id' })
  genreId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @ManyToOne(() => Book, (book) => book.genreConnection, { primary: true })
  @JoinColumn({ name: 'book_id' })
  book: Book[];

  @ManyToOne(() => Genre, (genre) => genre.bookConnection, { primary: true })
  @JoinColumn({ name: 'genre_id' })
  genre: Genre[];
}
