import * as jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export default class Token {
  static generateToken(id: number) {
    const token = jwt.sign({ id }, jwtSecret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  }

  static verifyToken(token: string) {
    const tokenVerify = jwt.verify(token, jwtSecret as string);
    return tokenVerify;
  }
}
