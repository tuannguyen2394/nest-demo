import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';

@Entity('users')
export class Users extends BaseEntity {
  @Column({ length: 255, nullable: true, unique: true })
  email: string;

  @Column({ length: 255, nullable: true, default: 'user' })
  user_role: string;

  @Column({ length: 255, nullable: true })
  firstname: string;

  @Column({ length: 255, nullable: true })
  lastname: string;

  @Column({ length: 255, nullable: true })
  phone_number: string;

  @Column({
    default:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    nullable: true,
  })
  avatar: string;
}
