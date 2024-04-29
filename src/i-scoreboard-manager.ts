import { ScoreboardData } from "./model/scoreboard-data";

export interface IScoreboardManager {
    startMatch: (homeTeamName: string, awayTeamName: string) => number;
    updateScore: (matchId: number, homeTeamScore: number, awayTeamScore: number) => void;
    finishMatch: (matchId: number) => void;
    getData: () => Array<ScoreboardData>
}