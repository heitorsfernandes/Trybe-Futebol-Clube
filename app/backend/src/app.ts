import * as express from 'express';
import UserController from './database/controllers/UserController';
import TeamsController from './database/controllers/TeamsController';
import MatchesController from './database/controllers/MatchesController';
import LeaderboardController from './database/controllers/LeaderboardController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/matches', MatchesController.getMatches);
    this.app.post('/login', UserController.userLogin);
    this.app.get('/login/validate', UserController.validateLogin);
    this.app.get('/teams', TeamsController.getAllTeams);
    this.app.get('/teams/:id', TeamsController.getTeamById);
    this.app.post('/matches', MatchesController.postMatch);
    this.app.patch('/matches/:id/finish', MatchesController.updateMatchStatus);
    this.app.patch('/matches/:id', MatchesController.updateMatchScore);
    this.app.get('/leaderboard/home', LeaderboardController.getLeaderboardHome);
    this.app.get('/leaderboard/away', LeaderboardController.getLeaderboardAway);
    this.app.get('/leaderboard', LeaderboardController.getLeaderboardAll);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
