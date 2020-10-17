import { Migration } from '@mikro-orm/migrations';

export class Migration20201017171637 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop column "first_name";');
  }

}
