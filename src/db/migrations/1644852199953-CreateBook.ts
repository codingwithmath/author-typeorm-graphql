import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBook1644852199953 implements MigrationInterface {
  private bookTable = new Table({
    name: 'books',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isUnique: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'title',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'author_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        isPrimary: false,
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isPrimary: false,
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private foreingKey = new TableForeignKey({
    columnNames: ['author_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'authors',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.bookTable);
    await queryRunner.createForeignKey('books', this.foreingKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.bookTable);
  }
}
