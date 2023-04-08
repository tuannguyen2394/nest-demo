import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { appInsightClient } from '../_helper/config';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    appInsightClient.trackException({ exception });
    super.catch(exception, host);
  }
}
