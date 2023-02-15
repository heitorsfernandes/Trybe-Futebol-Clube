import { Request, Response } from 'express';
import UserServices from '../services/UserServices';

export default class UserController {
  static async userLogin(req:Request, res:Response) {
    const { email, password } = req.body;
    const user = await UserServices.userLogin(email, password);
    return res.status(user.status).json(user.message);
  }

  static async validateLogin(req: Request, res: Response) {
    const { authorization } = req.headers;
    const validate = await UserServices.validateLogin(authorization as string);

    if (!validate) return res.status(401).json({ message: 'Invalid token' });

    return res.status(200).json(validate);
  }
}
