/* eslint-disable @typescript-eslint/no-empty-function */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor() {}

  tokenize({
    data,
    expiresIn = process.env.JWT_LIFESPAN,
  }: {
    data: string;
    expiresIn?: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        data,
        process.env.TOKEN_SECRET,
        { expiresIn },
        (err, decoded) => {
          if (err) reject(new InternalServerErrorException(err));
          resolve(decoded);
        },
      );
    });
  }

  verify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const tokenSecret = process.env.TOKEN_SECRET;
      jwt.verify(token, tokenSecret, (err: any, decoded: any) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            throw new UnauthorizedException('Token has expired');
          }
          reject(new UnauthorizedException(err));
        }
        resolve(decoded);
      });
    });
  }

  decode(token: string) {
    return jwt.decode(token, { complete: true });
  }

  /**function that abstract generation of jwt and refresh token */
  async generateTokens(data: string) {
    // generate jwt
    const authorizationToken = await this.tokenize({
      data,
      expiresIn: process.env.JWT_LIFESPAN,
    });
    return { authorizationToken };
  }
  catch(e) {
    Logger.error(e);
    throw new BadRequestException(e.message);
  }
}
