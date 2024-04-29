import { IScoreboardManager } from "./i-scoreboard-manager";
import { ScoreboardData } from "./model/scoreboard-data";

export class ScoreboardManager implements IScoreboardManager {
    startMatch(homeTeamName: string, awayTeamName: string): number {
        return -1;
    }
    updateScore(matchId: number, homeTeamScore: number, awayTeamScore: number): void {}
    finishMatch(matchId: number): void {}
    getData(): Array<ScoreboardData> {
        return [];
    }
}