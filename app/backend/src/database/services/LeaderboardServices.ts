import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import Matches from '../models/Matches';
import Teams from '../models/Teams';
import MathUtils from './utils/LeaderboardMaths';

export default class LeaderboardServices {
  static homeLb: ILeaderboard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  static awayLb: ILeaderboard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  static sortLeaderboard(teamLeaderboard: ILeaderboard[]) {
    const result = teamLeaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return result;
  }

  static async boardHome(allTeams:ITeam[], allMatches:IMatch[]) {
    return allTeams.map((t) => {
      const board = { ...this.homeLb };
      board.name = t.teamName;
      allMatches.forEach((m) => {
        if (t.id === m.homeTeamId) {
          board.totalPoints += MathUtils.homeTotalPoints(m.homeTeamGoals, m.awayTeamGoals);
          board.totalGames += 1;
          board.totalVictories += MathUtils.homeVictories(m.homeTeamGoals, m.awayTeamGoals);
          board.totalDraws += MathUtils.homeDraws(m.homeTeamGoals, m.awayTeamGoals);
          board.totalLosses += MathUtils.homeLosses(m.homeTeamGoals, m.awayTeamGoals);
          board.goalsFavor += m.homeTeamGoals;
          board.goalsOwn += m.awayTeamGoals;
        }
      });
      board.goalsBalance = board.goalsFavor - board.goalsOwn;
      board.efficiency = MathUtils.efficiency(board.totalPoints, board.totalGames);
      return board;
    });
  }

  static async boardAway(allTeams:ITeam[], allMatches:IMatch[]) {
    return allTeams.map((t) => {
      const board = { ...this.awayLb };
      board.name = t.teamName;
      allMatches.forEach((m) => {
        if (t.id === m.awayTeamId) {
          board.totalPoints += MathUtils.awayTotalPoints(m.homeTeamGoals, m.awayTeamGoals);
          board.totalGames += 1;
          board.totalVictories += MathUtils.awayVictories(m.homeTeamGoals, m.awayTeamGoals);
          board.totalDraws += MathUtils.awayDraws(m.homeTeamGoals, m.awayTeamGoals);
          board.totalLosses += MathUtils.awayLosses(m.homeTeamGoals, m.awayTeamGoals);
          board.goalsFavor += m.awayTeamGoals;
          board.goalsOwn += m.homeTeamGoals;
        }
      });
      board.goalsBalance = board.goalsFavor - board.goalsOwn;
      board.efficiency = MathUtils.efficiency(board.totalPoints, board.totalGames);
      return board;
    });
  }

  static async getLeaderboardHome() {
    const allMatches:IMatch[] = await Matches.findAll({ where: { inProgress: false } });
    const allTeams:ITeam[] = await Teams.findAll();
    const homeLeaderBoard = await this.boardHome(allTeams, allMatches);
    const finalSorted = this.sortLeaderboard(homeLeaderBoard);
    return finalSorted;
  }

  static async getLeaderboardAway() {
    const allMatches:IMatch[] = await Matches.findAll({ where: { inProgress: false } });
    const allTeams:ITeam[] = await Teams.findAll();
    const awayLeaderBoard = await this.boardAway(allTeams, allMatches);
    const finalSorted = this.sortLeaderboard(awayLeaderBoard);
    return finalSorted;
  }
}
