import { match } from 'assert';
import Match from '../models/Match';
import { MatchStatus } from '../models/MatchStatus';

export default class ScoreBoardService{
    matches: Match[];

    constructor(){
        this.matches = [];
    }

    startMatch = (homeTeam: string, awayTeam: string) =>{
        const match = new Match(homeTeam, awayTeam);
        match.startMatch();
        this.matches.push(match);
    }

    updateScore = (id: number, homeScore: number, awayScore: number) => {
        const match = this.matches.find(match => match.id === id);
        if(!match){
            throw new Error('Match not found');
        }
        match.updateScore(homeScore, awayScore);
    }

    finishMatch = (id: number) => {
        const  match = this.matches.find(match => match.id === id);
        if(!match){
            throw new Error('Match not found');
        }
        match.finishMatch();
        this.matches.splice(this.matches.indexOf(match), 1);
    }

    getSummary(): Match[] {
        const liveMatches = this.matches.filter(match => match.matchStatus === MatchStatus.LIVE)
        const sortedArray = liveMatches.sort((a, b) => {
          const totalScoreDiff = b.totalScore() - a.totalScore();
          if (totalScoreDiff !== 0) {
            return totalScoreDiff; 
          } else {
            return (b.startTime?.getTime() ?? 0) - (a.startTime?.getTime() ?? 0);
          }
        });
        return sortedArray;
      }

}