import { Request, Response } from 'express';

import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardController {
  static async getLeaderboardHome(req: Request, res: Response) {
    const result = await LeaderboardServices.getLeaderboardHome();

    return res.status(200).json(result);
  }

  static async getLeaderboardAway(req: Request, res: Response) {
    const result = await LeaderboardServices.getLeaderboardAway();

    return res.status(200).json(result);
  }

  static async getLeaderboardAll(req: Request, res: Response) {
    const result = await LeaderboardServices.getLeaderboardAll();

    return res.status(200).json(result);
  }
}
