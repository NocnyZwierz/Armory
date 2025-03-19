/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private requiredRole?: string) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Brak tokena lub niepoprawny format nagłówka',
      );
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new UnauthorizedException('Brak klucza JWT');
    }

    try {
      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

      if (!decoded.id || !decoded.admin) {
        throw new UnauthorizedException('Niepoprawne dane sesji');
      }
      return true;
    } catch (error) {
      console.error('Błąd dekodowania tokena:', error.message);
      throw new UnauthorizedException('Nieprawidłowy token');
    }
  }
}
