import * as jwt from 'jsonwebtoken';
import Matches from '../models/Matches';
import Teams from '../models/Teams';
import INewMatch from '../interfaces/INewMatch';
import Token from '../middlewares/token';

export default class TeamsServices {
  static async getMatches() {
    const data = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return data;
  }

  static async getMatchesInProgress(param: string) {
    let data;
    if (param === 'true') {
      data = await Matches.findAll({
        where: { inProgress: true },
        include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
    } if (param === 'false') {
      data = await Matches.findAll({
        where: { inProgress: false },
        include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
    }

    return data;
  }

  static async postMatch(newInfo:INewMatch, authorization: string) {
    const verify = Token.verifyToken(authorization) as jwt.JwtPayload;
    if (!verify) {
      return { status: 401, message: { message: 'Token must be a valid token' } };
    }
    const homeTeam = await Teams.findByPk(newInfo.homeTeamId);
    const awayTeam = await Teams.findByPk(newInfo.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return {
        status: 404,
        message: { message: 'There is no team with such id!' } };
    }
    if (newInfo.homeTeamId === newInfo.awayTeamId) {
      return {
        status: 422,
        message: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const data = await Matches.create({ ...newInfo, inProgress: true });
    return { status: 201, message: data };
  }

  static async updateMatchStatus(id: number) {
    Matches.update({ inProgress: false }, { where: { id } });
  }

  static async updateMatchScore(id:number, newScore:INewMatch) {
    Matches.update({ ...newScore }, { where: { id } });
  }
}
