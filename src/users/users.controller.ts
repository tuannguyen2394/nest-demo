import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { genPagination } from '../_helper/functions';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: UsersDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/:id')
  getUserById(@Req() req, @Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get()
  getListUser(@Req() req, @Query() query) {
    const pagination = genPagination(query);
    return this.usersService.getListUser(query, pagination);
  }
}
