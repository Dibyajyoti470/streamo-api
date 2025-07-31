import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ResponseFormatted } from '../interfaces/api.interface';
import { map, Observable } from 'rxjs';
import { Status } from '../enums/api.enum';
import { Reflector } from '@nestjs/core';
import { SUCCESS_MESSAGE_KEY } from '../decorators/success-message.decorator';

export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ResponseFormatted<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseFormatted<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: Status.SUCCESS,
        message: this.getSuccessMessage(context, data),
        data,
      })),
    );
  }

  private getSuccessMessage(context: ExecutionContext, data: any): string {
    const customMessage = this.reflector.get<string>(
      SUCCESS_MESSAGE_KEY,
      context.getHandler(),
    );

    if (customMessage) {
      return customMessage;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const route = context
      .getClass()
      .name.replace('Controller', '')
      .toLowerCase();

    switch (method) {
      case 'POST':
        return `${this.capitalize(route)} created successfully`;
      case 'GET':
        return Array.isArray(data)
          ? `All ${route}s fetched successfully`
          : `${this.capitalize(route)} fetched successfully`;
      case 'PATCH':
      case 'PUT':
        return `${this.capitalize(route)} updated successfully`;
      case 'DELETE':
        return `${this.capitalize(route)} deleted successfully`;
      default:
        return 'Operation completed successfully';
    }
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
