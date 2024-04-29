# sportradar-challenge
Coding challenge for sportradar

## Library reference

### ScoreboardManager
Creates a manager that holds the state of all the matches.

#### Methods
`startMatch(homeTeamName: string, awayTeamName: string) => number` - Adds a match between teams with names given in the input arguments and an initial score of 0-0. Returns a matchId, that identifies a match in the scoreboard.

`updateScore(matchId: number, homeTeamScore: number, awayTeamScore: number) => void` - Updates the score for the match with given matchId. Throws a validation error if any of the scores is negative, the match with given matchId doesn't exist or the match was already finished

`finishMatch(matchId: number) => void` - Finishes a match with given matchId and makes it unavailable to update or view on the scoreboard. Throws a validation error if the match with given matchId doesn't exist or the match was already finished

`getData() => Array<ScoreboardData>` - Returns the data of all matches that are in progress from the scoreboard.

### ScoreboardPresenter
Creates a class responsible for presenting the data from the scoreboard

#### constructor arguments
`scoreboardManager: IScoreboardManger` an instance of scoreboard manager responsible for providing the data to the presenter
`presenterConfig?: PresenterConfig` optional configuration of the scoreboard, which enables modification of the sorting method

#### methods
`getSummary() => Array<Match>` returns all the matches from the scoreboard in the order given by the configuration. By default, the matches are sorted by their total score in descending order. If totalScores are equal, matches that were started later are presented first.

## Library models reference

### ScoreboardData
```
startOrder: number -> order in which the match was added to the scoreboard. The higher the number, the later it was added
match: MatchData -> data from the match
```

### MatchData
```
id: number -> id of the match
homeTeam: TeamState -> state of the home team during the match
awayTeam: TeamState -> state of the away team during the match
state: MatchState -> state of the match. Possible values are: IN_PROGRESS and FINISHED
```

### TeamState
```
team: TeamData -> information about the team
score: number -> score of the team
```

### TeamData
```
name: string -> name of the team
```

## Possible improvements
- Improving validation logic of the `updateScore` method (blocking scores that are too low or too high in relation to the state saved in the scoreboard)
- Adding more sorting strategies