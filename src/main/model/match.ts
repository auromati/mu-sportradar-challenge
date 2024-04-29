import { TeamMatchState } from "./team-match-state";

export interface Match {
    id: number;
    homeTeam: TeamMatchState;
    awayTeam: TeamMatchState;
}