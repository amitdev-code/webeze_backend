import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserTimezone = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const timezone = request.headers.timezone;

    if (!timezone) {
      return null;
    }

    return timezone;
  },
);
