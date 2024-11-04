import ScoreboardService from '../services/ScoreboardService';
import Match from '../models/Match';

describe('ScoreboardService', ()=>{
    let scoreboardService: ScoreboardService;
    
    beforeAll(()=>{
        scoreboardService = new ScoreboardService();
        scoreboardService.startMatch('Mexico', 'Canada');
    })

    test('should be able to start a new match with an initial score of 0-0', ()=>{
        expect(scoreboardService.matches.length).toBeGreaterThan(0);
        expect(scoreboardService.matches[0].homeScore).toBe(0);
        expect(scoreboardService.matches[0].awayScore).toBe(0);
    });

    test('should be able to update the score of a match', ()=>{
        scoreboardService.updateScore(1, 5, 0);
        const updatedMatch = scoreboardService.matches.find(match => match.id === 1);
        expect(updatedMatch?.homeScore).toBe(5);
        expect(updatedMatch?.awayScore).toBe(0);
    });

    test('should be able to finish a match', ()=>{
        const updatedMatch = scoreboardService.matches.find(match => match.id === 1);
        scoreboardService.finishMatch(1);
        expect(scoreboardService.matches.length).toBe(0);
    });

    test('should be able to get a summary of all existing games', (done: jest.DoneCallback)=>{
        scoreboardService.startMatch('Spain', 'Brazil');
        scoreboardService.updateScore(2, 10, 2);
        setTimeout(()=>{
            scoreboardService.startMatch('Germany', 'France');
            scoreboardService.updateScore(3, 2, 2);
            setTimeout(()=>{
                scoreboardService.startMatch('Uruguay', 'Italy');
                scoreboardService.updateScore(4, 1, 3);
                const summary = scoreboardService.getSummary();
                expect(summary[0].homeTeam).toBe('Spain');
                expect(summary[1].homeTeam).toBe('Uruguay'); //Uruguay vs Italy has a more recent start time
                expect(summary[2].homeTeam).toBe('Germany'); //although the score is the same as Germany vs France
                done();
            }, 50)
        }, 50)
    })
})