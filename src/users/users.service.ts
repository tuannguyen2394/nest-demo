import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// entities
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}
  async create(createUserDto: UsersDto) {
    // init transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // start transaction
    await queryRunner.startTransaction();

    try {
      const createdUser = await queryRunner.manager.save(Users, createUserDto);

      // commit transaction
      await queryRunner.commitTransaction();

      return createdUser;
    } catch (error) {
      // rollback transaction
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // release transaction
      await queryRunner.release();
    }
  }

  async getUserById(userId) {
    const foundUser = await this.userRepo.findOne({ where: { id: userId } });
    return foundUser;
  }

  async getListUser(
    query,
    pagination: {
      skip?: number;
      take?: number;
    },
  ) {
    let where = {};
    if (query.email) {
      where = Object.assign({ email: query.email }, where);
    }
    const [list, total] = await this.userRepo
      .createQueryBuilder('user')
      .where(where)
      .select([
        'user.id',
        'user.firstname',
        'user.lastname',
        'user.email',
        'user.phone_number',
        'user.avatar',
        'user.created_at',
        'user.updated_at',
      ])
      .skip(pagination.skip)
      .take(pagination.take)
      .orderBy('created_at', 'DESC')
      .getManyAndCount();
    return {
      total: total || 0,
      data: list || [],
    };
  }
}
