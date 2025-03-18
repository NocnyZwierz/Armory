/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}
//$2b$10$8jbpEL6Gf9h0UdC2ejHqeuxgoLoMEnH3rUU5CeaQgFu3HFfL21lfW
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { admin, password } = loginDto;

    const user = await this.authRepository.findOne({ where: { admin } });
    if (!user) {
      throw new UnauthorizedException('Błędne dane logowania');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Błędne dane logowania');
    }

    user.isLogIn = true;
    await this.authRepository.save(user);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    const token = jwt.sign(
      { id: user.id, admin: user.admin },
      jwtSecret,
      { expiresIn: '1h' },
    );

    return { token };
  }

  async logout(logoutDto: LogoutDto): Promise<{ message: string }> {
    const { admin } = logoutDto;
    const user = await this.authRepository.findOne({ where: { admin } });
    if (!user) {
      throw new UnauthorizedException('Użytkownik nie został znaleziony');
    }

    user.isLogIn = false;
    await this.authRepository.save(user);

    return { message: 'Wylogowano pomyślnie' };
  }
}
