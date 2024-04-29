import { IScoreboardPresenter } from "./i-scoreboard-presenter";
import { ScoreboardData } from "./model/scoreboard-data";

export class ScoreboardPresenter implements IScoreboardPresenter {
    getSummary(): Array<ScoreboardData> {
        return [];
    }

}