import { MatchState } from "./match-state";
import { TeamState } from "./team-state";

export interface Match {
    id: number;
    homeTeam: TeamState;
    awayTeam: TeamState;
    state: MatchState;
}