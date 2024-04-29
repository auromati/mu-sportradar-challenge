import { ScoreboardData } from "./scoreboard-data";

export interface PresenterConfig {
    sortingFunction?: (match1: ScoreboardData, match2: ScoreboardData) => number;
}