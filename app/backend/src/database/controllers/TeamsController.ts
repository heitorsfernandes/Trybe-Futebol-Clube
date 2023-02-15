import { Request, Response } from 'express';
import TeamsServices from '../services/TeamsServices';

export default class TeamsController {
  static async getAllTeams(req:Request, res:Response) {
    const result = await TeamsServices.getAllTeams();
    return res.status(200).json(result);
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TeamsServices.getTeamById(Number(id));

    return res.status(200).json(result);
  }
}
