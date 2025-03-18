/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    this.sanitizeInPlace(req.body);
    this.sanitizeInPlace(req.query);
    this.sanitizeInPlace(req.params);

    next();
  }

  private sanitizeInPlace(obj: any): void {
    if (!obj || typeof obj !== 'object') return;

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'string') {
        obj[key] = sanitizeHtml(obj[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
      } else if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item) =>
          typeof item === 'string'
            ? sanitizeHtml(item, { allowedTags: [], allowedAttributes: {} })
            : item,
        );
      } else if (typeof obj[key] === 'object') {
        this.sanitizeInPlace(obj[key]);
      }
    });
  }
}
