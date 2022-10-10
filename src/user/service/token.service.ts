// /* eslint-disable @typescript-eslint/no-empty-function */
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
  tokenize(data: string): Promise<string> {
    console.log(process.env.TOKEN_SECRET, process.env.JWT_LIFESPAN, data);
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: data },
        process.env.TOKEN_SECRET as string,
        { expiresIn: process.env.JWT_LIFESPAN as string },
        (err, decoded) => {
          if (err) {
            console.log('err');
            reject(new InternalServerErrorException(err));
          }
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
    const authorizationToken = await this.tokenize(data);
    console.log('hi');
    return { authorizationToken };
  }
  catch(e) {
    Logger.error(e);
    throw new BadRequestException(e.message);
  }
}
