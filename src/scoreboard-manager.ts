import { IScoreboardManager } from "./i-scoreboard-manager";
import { MatchData } from "./model/match-data";
import { MatchState } from "./model/match-state";
import { ScoreboardData } from "./model/scoreboard-data";
import { TeamState } from "./model/team-state";
import { ValidationError } from "./validation-error";

export class ScoreboardManager implements IScoreboardManager {
    private data = new Map<number, ScoreboardData>();
    private id = 0;
    private order = 0;

    startMatch(homeTeamName: string, awayTeamName: string): number {
        const match: MatchData = {
            id: this.id,
            state: MatchState.IN_PROGRESS,
            homeTeam: {
                team: {name: homeTeamName},
                score: 0
            },
            awayTeam: {
                team: {name: awayTeamName},
                score: 0
            }
        };

        this.data.set(this.id, {match, startOrder: this.order++});

        return this.id++;
    }
    updateScore(matchId: number, homeTeamScore: number, awayTeamScore: number): void {
        const scoreboardData = this.data.get(matchId);

        if (scoreboardData === null || scoreboardData === undefined) {
            throw new ValidationError('There is no match with given id');
        }

        if (homeTeamScore < 0) {
            throw new ValidationError('Home score is negative');
        }

        if (awayTeamScore < 0) {
            throw new ValidationError('Away score is negative');
        }

        if (scoreboardData.match.state === MatchState.FINISHED) {
            throw new ValidationError('The match with given id is already finished');
        }

        const newHomeTeamState: TeamState = {...scoreboardData.match.homeTeam, score: homeTeamScore};
        const newAwayTeamState: TeamState = {...scoreboardData.match.awayTeam, score: awayTeamScore};
        const newMatchData: MatchData = {...scoreboardData.match, homeTeam: newHomeTeamState, awayTeam: newAwayTeamState};

        this.data.set(matchId, {...scoreboardData, match: newMatchData});
    }
    finishMatch(matchId: number): void {
        const scoreboardData = this.data.get(matchId);

        if (scoreboardData === null || scoreboardData === undefined) {
            throw new ValidationError('There is no match with given id');
        }

        if (scoreboardData.match.state === MatchState.FINISHED) {
            throw new ValidationError('The match with given id is already finished');
        }

        const newMatchData: MatchData = {...scoreboardData.match, state: MatchState.FINISHED};
        
        this.data.set(matchId, {...scoreboardData, match: newMatchData});
    }
    getData(): Array<ScoreboardData> {
        return [...this.data.values()].filter(scoreBoardData => scoreBoardData.match.state !== MatchState.FINISHED);
    }
}