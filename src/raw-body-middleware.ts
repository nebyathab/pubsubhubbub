import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['content-type'] === 'application/xml') {
      req.setEncoding('utf8');
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        req.body = data;
        next();
      });
    } else {
      next();
    }
  }
}
