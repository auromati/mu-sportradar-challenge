import { IScoreboardManager } from "./i-scoreboard-manager";
import { IScoreboardPresenter } from "./i-scoreboard-presenter";
import { Match } from "./model/match";
import { PresenterConfig } from "./model/presenter-config";

export class ScoreboardPresenter implements IScoreboardPresenter {

    constructor(private scoreboardManager: IScoreboardManager, private presenterConfig: PresenterConfig = {}) {}

    getSummary(): Array<Match> {
        return [];
    }

}