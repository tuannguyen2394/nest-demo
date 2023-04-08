import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';

@Entity('tokens')
export class Token extends BaseEntity {
  @Column({ nullable: true, length: 1000 })
  token: string;

  @Column({ nullable: true, length: 1000 })
  access_token: string;

  @Column({ nullable: true, length: 1000 })
  refresh_token: string;

  @Column({ type: 'int', default: 1 })
  is_active: number;
}
