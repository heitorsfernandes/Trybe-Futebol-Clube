export default class MathUtils {
  static homeTotalPoints(homeGoals: number, awayGoals:number):number {
    if (homeGoals === awayGoals) return 1;
    if (homeGoals > awayGoals) return 3;
    return 0;
  }

  static homeVictories(homeGoals:number, awayGoals:number) {
    if (homeGoals > awayGoals) return 1;
    return 0;
  }

  static homeLosses(homeGoals:number, awayGoals:number) {
    if (homeGoals < awayGoals) return 1;
    return 0;
  }

  static homeDraws(homeGoals:number, awayGoals:number) {
    if (homeGoals === awayGoals) return 1;
    return 0;
  }

  static efficiency(points:number, games:number) {
    const result = (points / (games * 3)) * 100;
    return result.toFixed(2);
  }

  static awayTotalPoints(homeGoals: number, awayGoals:number):number {
    if (homeGoals === awayGoals) return 1;
    if (homeGoals < awayGoals) return 3;
    return 0;
  }

  static awayVictories(homeGoals:number, awayGoals:number) {
    if (homeGoals < awayGoals) return 1;
    return 0;
  }

  static awayLosses(homeGoals:number, awayGoals:number) {
    if (homeGoals > awayGoals) return 1;
    return 0;
  }

  static awayDraws(homeGoals:number, awayGoals:number) {
    if (homeGoals === awayGoals) return 1;
    return 0;
  }
}
