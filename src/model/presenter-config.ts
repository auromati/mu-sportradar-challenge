import { ScoreboardData } from "./scoreboard-data";

export interface PresenterConfig {
    sortingFunction?: ScoreboardSortingStrategy
}

export type ScoreboardSortingStrategy = (match1: ScoreboardData, match2: ScoreboardData) => number;