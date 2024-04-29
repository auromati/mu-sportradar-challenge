import { MatchData } from "./model/match-data";

export interface IScoreboardPresenter {
    getSummary(): Array<MatchData>;
}