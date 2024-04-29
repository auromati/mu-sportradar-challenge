import { IScoreboardManager } from "./i-scoreboard-manager";
import { IScoreboardPresenter } from "./i-scoreboard-presenter";
import { MatchData } from "./model/match-data";
import { PresenterConfig } from "./model/presenter-config";
import { ScoreboardData } from "./model/scoreboard-data";

export class ScoreboardPresenter implements IScoreboardPresenter {

    private defaultConfig: Required<PresenterConfig> = {
        sortingFunction: (match1: ScoreboardData, match2: ScoreboardData) => {
            const totalScore = (scoreBoardData: ScoreboardData) => scoreBoardData.match.homeTeam.score + scoreBoardData.match.awayTeam.score;
            const totalScoreOrder = totalScore(match2) - totalScore(match1);
            if (totalScoreOrder > 0) {
                return totalScoreOrder;
            }

            return match2.startOrder - match1.startOrder;
        }
    }

    constructor(private scoreboardManager: IScoreboardManager, private presenterConfig: PresenterConfig = {}) {}

    getSummary(): Array<MatchData> {
        const data = [...this.scoreboardManager.getData()].sort((match1, match2) => this.defaultConfig.sortingFunction(match1, match2));
        return data.map(data => data.match);
    }

}