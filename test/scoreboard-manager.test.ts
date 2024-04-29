import { MatchState } from '../src/model/match-state';
import { ScoreboardManager } from '../src/scoreboard-manager';

describe('ScoreboardManager', () => {

    let scoreboardManager: ScoreboardManager;
    beforeEach(() => {
        scoreboardManager = new ScoreboardManager();
    })

    describe('add match', () => {
        test('should return unique ids for different matches', () => {
            const matchId1 = scoreboardManager.startMatch('Uruguay', 'Canada');
            const matchId2 = scoreboardManager.startMatch('Italy', 'France');

            expect(matchId1).not.toEqual(matchId2);
        });

        test('should add matches to the manager with an initial score of 0-0 and an appropiate order', () => {
            scoreboardManager.startMatch('Uruguay', 'Canada');
            scoreboardManager.startMatch('Italy', 'France');

            const data = scoreboardManager.getData();

            expect(data).toEqual([
                {
                    matchOrder: 0,
                    match: {
                        id: expect.any(Number),
                        homeTeam: {
                            team: {name: 'Uruguay'},
                            score: 0
                        },
                        awayTeam: {
                            team: {name: 'Canada'},
                            score: 0
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                },
                {
                    matchOrder: 1,
                    match: {
                        id: expect.any(Number),
                        homeTeam: {
                            team: {name: 'Italy'},
                            score: 0
                        },
                        awayTeam: {
                            team: {name: 'France'},
                            score: 0
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                },
            ]);
        });
    });

    describe('update score', () => {
        test('should throw an error if there is no match with given id', () => {
            expect(() => scoreboardManager.updateScore(-1, 1, 1)).toThrow('There is no match with given id');
        });

        test('should throw an error if the match is already finished', () => {
            const matchId = scoreboardManager.startMatch('Team1', 'Team2');
            scoreboardManager.finishMatch(matchId);

            expect(() => scoreboardManager.updateScore(matchId, 1, 1)).toThrow('The match with given id is already finished');
        });

        test('should throw an error if a home score is negative', () => {
            const matchId = scoreboardManager.startMatch('Team1', 'Team2');

            expect(() => scoreboardManager.updateScore(matchId, -1, 1)).toThrow('Home score is negative');
        });

        test('should throw an error if an away score is negative', () => {
            const matchId = scoreboardManager.startMatch('Team1', 'Team2');

            expect(() => scoreboardManager.updateScore(matchId, 1, -1)).toThrow('Away score is negative');
        });

        test('should update the score of the match with given matchId on the scoreboard', () => {
            scoreboardManager.startMatch('Uruguay', 'Canada');
            const matchId2 = scoreboardManager.startMatch('Italy', 'France');

            scoreboardManager.updateScore(matchId2, 3, 2);

            const data = scoreboardManager.getData();

            expect(data).toEqual([
                {
                    matchOrder: 0,
                    match: {
                        id: expect.any(Number),
                        homeTeam: {
                            team: {name: 'Uruguay'},
                            score: 0
                        },
                        awayTeam: {
                            team: {name: 'Canada'},
                            score: 0
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                },
                {
                    matchOrder: 1,
                    match: {
                        id: expect.any(Number),
                        homeTeam: {
                            team: {name: 'Italy'},
                            score: 3
                        },
                        awayTeam: {
                            team: {name: 'France'},
                            score: 2
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                },
            ]);
        });
    });

    describe('finish match', () => {
        test('should throw an error if there is no match with given id', () => {
            expect(() => scoreboardManager.updateScore(-1, 1, 1)).toThrow('There is no match with given id');
        });

        test('should throw an error if the match is already finished', () => {
            const matchId = scoreboardManager.startMatch('Team1', 'Team2');
            scoreboardManager.finishMatch(matchId);

            expect(() => scoreboardManager.finishMatch(matchId)).toThrow('The match with given id is already finished');
        });

        test('should remove finished match from the scoreboard', () => {
            const matchId1 = scoreboardManager.startMatch('Uruguay', 'Canada');
            const matchId2 = scoreboardManager.startMatch('Italy', 'France');

            scoreboardManager.updateScore(matchId2, 3, 2);

            scoreboardManager.finishMatch(matchId1);

            const data = scoreboardManager.getData();

            expect(data).toEqual([
                {
                    matchOrder: 1,
                    match: {
                        id: expect.any(Number),
                        homeTeam: {
                            team: {name: 'Italy'},
                            score: 3
                        },
                        awayTeam: {
                            team: {name: 'France'},
                            score: 2
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                },
            ]);
        });
    });

    describe('get data', () => {
        test('should return an empty array if no match was started', () => {
            expect(scoreboardManager.getData()).toEqual([]);
        });
    });
});