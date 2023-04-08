import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { UsersDto } from './users.dto';
import { IsNumberString, Matches } from 'class-validator';

import {
  FIRSTNAME_NOT_CORRECT_FORMAT,
  LASTNAME_NOT_CORRECT_FORMAT,
  PHONENUMBER_NOT_CORRECT_FORMAT,
} from 'src/_exception/errorName';
import { name_regex, phonenumber_regex } from 'src/_helper/const';

export class UpdateUsersDto extends PartialType(UsersDto) {
  @ApiProperty()
  @Matches(name_regex, { message: FIRSTNAME_NOT_CORRECT_FORMAT })
  firstname?: string;

  @ApiProperty()
  @Matches(name_regex, { message: LASTNAME_NOT_CORRECT_FORMAT })
  lastname?: string;

  @ApiProperty()
  @Matches(phonenumber_regex, { message: PHONENUMBER_NOT_CORRECT_FORMAT })
  phone_number?: string;

  @ApiProperty()
  @IsNumberString()
  e_wallet?: string;
}
