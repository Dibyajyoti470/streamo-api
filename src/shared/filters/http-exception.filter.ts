import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseFormatted } from '../interfaces/api.interface';
import { Status } from '../enums/api.enum';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalHttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'object' && errorResponse['message']) {
        message = errorResponse['message'] as string;
      } else {
        message = errorResponse as string;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';

      this.logger.error(
        `Unexpected error: ${String(exception)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    const errorResponse: ResponseFormatted<null> = {
      status: Status.ERROR,
      message,
    };

    response.status(status).json(errorResponse);
  }
}
