import { ScoreboardData } from "./model/scoreboard-data";

export interface IScoreboardPresenter {
    getSummary(): Array<ScoreboardData>;
}