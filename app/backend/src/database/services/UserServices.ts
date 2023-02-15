import * as bcrypt from 'bcryptjs';
import { validate } from 'email-validator';
import * as jwt from 'jsonwebtoken';
import Token from '../middlewares/token';
import Users from '../models/Users';

export default class UserService {
  static async userLogin(email:string, password:string) {
    const messageIncorrect = 'Incorrect email or password';

    if (!email || !password) {
      return { status: 400, message: { message: 'All fields must be filled' } };
    }
    if (!validate(email)) {
      return { status: 401, message: { message: messageIncorrect } };
    }

    const data = await Users.findOne({ where: { email } });
    if (!data) {
      return { status: 401, message: { message: messageIncorrect } };
    }
    if (!await bcrypt.compare(password, data.password)) {
      return { status: 401, message: { message: messageIncorrect } };
    }

    return { status: 200, message: { token: Token.generateToken(Number(data.id)) } };
  }

  static async validateLogin(authorization: string) {
    /* if (!authorization) {
      return { status: 401, message: { message: 'Expired or invalid token' } };
    } */
    // const { data } = Token.verifyToken(authorization) as jwt.JwtPayload;
    // const { id } = data;
    // const result = await Users.findOne({ where: { id } });
    // return { status: 200, message: { role: result?.dataValues.role } };
    const data = Token.verifyToken(authorization) as jwt.JwtPayload;
    const { id } = data;
    const result = await Users.findOne({ where: { id } });
    return { role: result?.dataValues.role };
  }
}
