import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserIp = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const ip = request.headers.ip;

    if (!ip) {
      return '127.0.0.1';
    }

    return ip;
  },
);
