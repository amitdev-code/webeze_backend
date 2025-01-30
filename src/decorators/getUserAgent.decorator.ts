import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserAgent = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const useragent = request.headers['user-agent'];

    if (!useragent) {
      return null;
    }

    const parsedUserAgent = parseUserAgent(useragent);

    const userAgentObject = {
      version: parsedUserAgent.version || '',
      os: parsedUserAgent.os || '',
      platform: parsedUserAgent.platform || '',
      source: parsedUserAgent.source || '',
      browser: parsedUserAgent.browser || '',
    };
    return JSON.stringify(userAgentObject);
  },
);

function parseUserAgent(userAgentString: string) {
  return JSON.parse(userAgentString);
}
