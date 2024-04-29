import { MatchState } from "./match-state";
import { TeamState } from "./team-state";

export interface MatchData {
    id: number;
    homeTeam: TeamState;
    awayTeam: TeamState;
    state: MatchState;
}