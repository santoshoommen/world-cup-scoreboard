import Match from '../models/Match';
import { MatchStatus } from '../models/MatchStatus';

describe('Match', () => {
    let match: Match;
    beforeAll(() => {
        match = new Match('Mexico', 'Canada');
    });
   
    test('should create a new match with the correct teams and the initial score',() =>{
       expect(match).toMatchObject({
        id:1,
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        homeScore: 0,
        awayScore: 0,
        matchStatus: MatchStatus.UPCOMING
       });
    });

    test('should update the status and start time when the match starts', ()=>{
        match.startMatch();
        expect(match.matchStatus).toBe(MatchStatus.LIVE);
        expect(match.startTime?.getTime() ?? 0).toBeGreaterThan(0);
    });

    test('should update the score of a match', ()=>{
        match.updateScore(1,2);
        expect(match.homeScore).toBe(1);
        expect(match.awayScore).toBe(2);
    });

    test('should get the total score correctly', ()=>{
        match.updateScore(1, 2);
        expect(match.totalScore()).toBe(3);
    });

    test('should update the status and time when the match ends', ()=>{
        match.finishMatch();
        expect(match.matchStatus).toBe(MatchStatus.FINISHED);
        expect(match.endTime?.getTime() ?? 0).toBeGreaterThan(0);
    })

});
