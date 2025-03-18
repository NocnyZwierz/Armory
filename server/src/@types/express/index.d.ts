/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';

declare module 'express' {
  interface Request {
    user?: { id: string; login: string; role: string };
  }
}
