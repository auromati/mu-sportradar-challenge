import { Match } from "./model/match";

export interface IScoreboardPresenter {
    getSummary(): Array<Match>;
}