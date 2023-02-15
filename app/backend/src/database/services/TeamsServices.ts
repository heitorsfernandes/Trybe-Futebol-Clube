import Teams from '../models/Teams';
import ITeam from '../interfaces/ITeam';

export default class TeamsServices {
  static async getAllTeams() {
    const data = await Teams.findAll();
    return data;
  }

  static async getTeamById(id: number): Promise<ITeam | null> {
    const data = await Teams.findByPk(id);
    return data;
  }
}
