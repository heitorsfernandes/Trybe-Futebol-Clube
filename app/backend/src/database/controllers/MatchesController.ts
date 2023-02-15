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

  static async postMatch(req: Request, res: Response) {
    const data = req.body;
    const { authorization } = req.headers;
    const { status, message } = await
    MatchesServices.postMatch(data, authorization as string);

    return res.status(status).json(message);
  }

  static async updateMatchStatus(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesServices.updateMatchStatus(+id);

    return res.status(200).json({ message: 'Finished' });
  }
}
