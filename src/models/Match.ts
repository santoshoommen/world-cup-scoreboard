import { MatchStatus } from "./MatchStatus";

export default class Match{
    static nextId: number = 1; 
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeScore: number = 0;
    awayScore: number = 0;
    matchStatus: MatchStatus = MatchStatus.UPCOMING;
    startTime?: Date;
    endTime?: Date;

    constructor(homeTeam: string, awayTeam: string){
        this.id = Match.nextId++;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    startMatch(): void{
        this.matchStatus = MatchStatus.LIVE;
        this.startTime = new Date();
    }

    updateScore(homeScore: number, awayScore: number): void{
        this.homeScore = homeScore;
        this.awayScore = awayScore;
    }

    totalScore(): number{
        return this.homeScore + this.awayScore;
    }

    finishMatch(): void{
        this.matchStatus = MatchStatus.FINISHED;
        this.endTime = new Date();
    }
}