import Matches from '../models/Matches';
import Teams from '../models/Teams';

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

  static async postMatch(newInfo:object) {
    const data = await Matches.create({ ...newInfo, inProgress: true });
    return data;
  }
}
