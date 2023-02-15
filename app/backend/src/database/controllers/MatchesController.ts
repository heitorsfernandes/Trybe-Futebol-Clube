import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';

export default class MatchesController {
  static async getMatches(req:Request, res:Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const result = await MatchesServices.getMatchesInProgress(inProgress as string);
      return res.status(200).json(result);
    }
    const result = await MatchesServices.getMatches();
    return res.status(200).json(result);
  }

/*   static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TeamsServices.getTeamById(Number(id));

    return res.status(200).json(result);
  } */
}
