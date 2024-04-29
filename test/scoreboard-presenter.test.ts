import { IScoreboardManager } from '../src/i-scoreboard-manager';
import { MatchState } from '../src/model/match-state';
import { ScoreboardPresenter } from '../src/scoreboard-presenter';
import { ScoreboardManager } from '../src/scoreboard-manager';

describe('ScoreboardManager', () => {

    let scoreboardPresenter: ScoreboardPresenter;

    describe('unit tests', () => {
        let scoreboardManager: any;
        beforeEach(() => {
             scoreboardManager = {
                startMatch: (x: string, y: string) =>  -1,
                updateScore: (x: number, y: number, z: number) => {},
                finishMatch: (x: number) => {},
                getData: jest.fn()
            };
            scoreboardPresenter = new ScoreboardPresenter(scoreboardManager as IScoreboardManager);
        });

        test('it should return empty data when there are no matches on the scoreboard manager', () => {
            scoreboardManager.getData.mockReturnValueOnce([]);

            const data = scoreboardPresenter.getSummary();

            expect(scoreboardManager.getData).toHaveBeenCalledTimes(1);
            expect(data).toEqual([]);
        });

        test('it should sort matches from the manager by their total scores in descending order', () => {
            scoreboardManager.getData.mockReturnValueOnce([
                {
                    matchOrder: 0,
                    match: {
                        id: 0,
                        homeTeam: {
                            team: {name: 'Uruguay'},
                            score: 3
                        },
                        awayTeam: {
                            team: {name: 'Canada'},
                            score: 1
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                },
                {
                    matchOrder: 1,
                    match: {
                        id: 1,
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
                {
                    matchOrder: 2,
                    match: {
                        id: 2,
                        homeTeam: {
                            team: {name: 'Poland'},
                            score: 5
                        },
                        awayTeam: {
                            team: {name: 'Germany'},
                            score: 0
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                }
            ]);

            const data = scoreboardPresenter.getSummary();

            expect(scoreboardManager.getData).toHaveBeenCalledTimes(1);
            expect(data).toEqual([
                {
                    id: 2,
                    homeTeam: {
                        team: {name: 'Poland'},
                        score: 5
                    },
                    awayTeam: {
                        team: {name: 'Germany'},
                        score: 0
                    },
                    state: MatchState.IN_PROGRESS,
                },
                {
                    id: 0,
                    homeTeam: {
                        team: {name: 'Uruguay'},
                        score: 3
                    },
                    awayTeam: {
                        team: {name: 'Canada'},
                        score: 1
                    },
                    state: MatchState.IN_PROGRESS,
                },
                {
                    id: 1,
                    homeTeam: {
                        team: {name: 'Italy'},
                        score: 0
                    },
                    awayTeam: {
                        team: {name: 'France'},
                        score: 0
                    },
                    state: MatchState.IN_PROGRESS,
                },
            ]);
        });

        test('it should sort matches from the manager by their startOrder in descending order when their total scores are equal', () => {
            scoreboardManager.getData.mockReturnValueOnce([
                {
                    matchOrder: 0,
                    match: {
                        id: 0,
                        homeTeam: {
                            team: {name: 'Uruguay'},
                            score: 3
                        },
                        awayTeam: {
                            team: {name: 'Canada'},
                            score: 1
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                },
                {
                    matchOrder: 1,
                    match: {
                        id: 1,
                        homeTeam: {
                            team: {name: 'Italy'},
                            score: 4
                        },
                        awayTeam: {
                            team: {name: 'France'},
                            score: 1
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                },
                {
                    matchOrder: 2,
                    match: {
                        id: 2,
                        homeTeam: {
                            team: {name: 'Poland'},
                            score: 5
                        },
                        awayTeam: {
                            team: {name: 'Germany'},
                            score: 0
                        },
                        state: MatchState.IN_PROGRESS,
                    }
                }
            ]);

            const data = scoreboardPresenter.getSummary();

            console.log(data);

            expect(scoreboardManager.getData).toHaveBeenCalledTimes(1);
            expect(data).toEqual([
                {
                    id: 2,
                    homeTeam: {
                        team: {name: 'Poland'},
                        score: 5
                    },
                    awayTeam: {
                        team: {name: 'Germany'},
                        score: 0
                    },
                    state: MatchState.IN_PROGRESS,
                },
                {
                    id: 1,
                    homeTeam: {
                        team: {name: 'Italy'},
                        score: 4
                    },
                    awayTeam: {
                        team: {name: 'France'},
                        score: 1
                    },
                    state: MatchState.IN_PROGRESS,
                },
                {
                    id: 0,
                    homeTeam: {
                        team: {name: 'Uruguay'},
                        score: 3
                    },
                    awayTeam: {
                        team: {name: 'Canada'},
                        score: 1
                    },
                    state: MatchState.IN_PROGRESS,
                },
            ]);
        });
    });

    describe('integration test', () => {
        let scoreboardManager: IScoreboardManager;
        beforeEach(() => {
            scoreboardManager = new ScoreboardManager();
            scoreboardPresenter = new ScoreboardPresenter(scoreboardManager);
        });

        it('should replicate an example from the specification', () => {
            const match1Id = scoreboardManager.startMatch('Mexico', 'Canada');
            const match2Id = scoreboardManager.startMatch('Spain', 'Brazil');
            const match3Id = scoreboardManager.startMatch('Germany', 'France');
            const match4Id = scoreboardManager.startMatch('Uruguay', 'Italy');
            const match5Id = scoreboardManager.startMatch('Belgium', 'Netherlands');
            const match6Id = scoreboardManager.startMatch('Argentina', 'Australia');

            scoreboardManager.updateScore(match1Id, 0, 5);
            scoreboardManager.updateScore(match2Id, 10, 2);
            scoreboardManager.updateScore(match3Id, 2, 2);
            scoreboardManager.updateScore(match4Id, 6, 6);
            scoreboardManager.updateScore(match6Id, 3, 1);

            scoreboardManager.finishMatch(match5Id);

            const data = scoreboardPresenter.getSummary();

            expect(data).toEqual([
                {
                    id: 3,
                    homeTeam: {
                        team: {name: 'Uruguay'},
                        score: 6
                    },
                    awayTeam: {
                        team: {name: 'Italy'},
                        score: 6
                    },
                    state: MatchState.IN_PROGRESS,
                },
                {
                    id: 1,
                    homeTeam: {
                        team: {name: 'Spain'},
                        score: 10
                    },
                    awayTeam: {
                        team: {name: 'Brazil'},
                        score: 2
                    },
                    state: MatchState.IN_PROGRESS,
                },
                {
                    id: 0,
                    homeTeam: {
                        team: {name: 'Mexico'},
                        score: 0
                    },
                    awayTeam: {
                        team: {name: 'Canada'},
                        score: 5
                    },
                    state: MatchState.IN_PROGRESS,
                },
                {
                    id: 5,
                    homeTeam: {
                        team: {name: 'Argentina'},
                        score: 3
                    },
                    awayTeam: {
                        team: {name: 'Australia'},
                        score: 1
                    },
                    state: MatchState.IN_PROGRESS,
                },
                {
                    id: 2,
                    homeTeam: {
                        team: {name: 'Germany'},
                        score: 2
                    },
                    awayTeam: {
                        team: {name: 'France'},
                        score: 2
                    },
                    state: MatchState.IN_PROGRESS,
                },
            ]);
        });
    });
});