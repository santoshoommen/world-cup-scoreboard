import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import AdminPanel from '../components/AdminPanel';
import ScoreboardService from '../services/ScoreboardService';
import { MatchStatus } from '../models/MatchStatus';

describe('AdminPanel', () => {
    let scoreboardService: ScoreboardService;

    beforeEach(() => {
        scoreboardService = new ScoreboardService();
        render(<AdminPanel scoreboardService={scoreboardService} />);
    });

    describe('initial state', () => {

        test('should render the Admin Panel with the correct elements', () => {
            //heading should render
            expect(screen.getByRole('heading', { level: 2, name: /admin panel/i })).toBeInTheDocument();
            //check if labels are rendered
            expect(screen.getByLabelText(/home team/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/away team/i)).toBeInTheDocument();
            //check if start match button is rendered
            expect(screen.getByRole('button', { name: /start match/i })).toBeInTheDocument();
        });
    });

    describe('start match', () => {
        test('should start a new match when the form is submitted', async () => {
            // Fill the form fields
            fireEvent.change(screen.getByLabelText(/home team/i), { target: { value: 'Mexico' } });
            fireEvent.change(screen.getByLabelText(/away team/i), { target: { value: 'Canada' } });
        
            // Click the start match button
            fireEvent.click(screen.getByRole('button', { name: /start match/i }));
        
            // Assert that a new match has started
            await waitFor(() => {
                expect(scoreboardService.matches.length).toBe(1);
            });
        
            expect(scoreboardService.matches[0]).toMatchObject({
                homeTeam: 'Mexico',
                awayTeam: 'Canada',
                homeScore: 0,
                awayScore: 0,
                matchStatus: MatchStatus.LIVE
            });
        });
    });

    describe('Update Score', () => {
        test('should update the score of an existing match', async () => {
          // Start a match
          fireEvent.change(screen.getByLabelText(/home team/i), { target: { value: 'Brazil' } });
          fireEvent.change(screen.getByLabelText(/away team/i), { target: { value: 'Argentina' } });
          fireEvent.click(screen.getByRole('button', { name: /start match/i }));
          const matchId = scoreboardService.matches[0].id;
    
          // Select the match and fill in the update score form
          fireEvent.change(screen.getByLabelText(/match to update/i), { target: { value: matchId } });
          fireEvent.change(screen.getByLabelText(/home score/i), { target: { value: 3 } });
          fireEvent.change(screen.getByLabelText(/away score/i), { target: { value: 1 } });
    
          // Click the "Update Score" button
          fireEvent.click(screen.getByRole('button', { name: /update score/i }));
    
          // Assert that the score has been updated
          await waitFor(() => {
            const updatedMatch = scoreboardService.matches.find(match => match.id === matchId);
            expect(updatedMatch).toBeDefined();
            expect(updatedMatch?.homeScore).toBe(3);
            expect(updatedMatch?.awayScore).toBe(1);
          });
        });
    });
    
    describe('Finish match', () => {
        test('should finish an existing match', async () => {
          // Start a match
          fireEvent.change(screen.getByLabelText(/home team/i), { target: { value: 'Brazil' } });
          fireEvent.change(screen.getByLabelText(/away team/i), { target: { value: 'Argentina' } });
          fireEvent.click(screen.getByRole('button', { name: /start match/i }));
          const matchId = scoreboardService.matches[0].id;
    
          // select the matche to finish
          fireEvent.change(screen.getByLabelText(/match to finish/i), { target: { value: matchId } });
          
          // Click the "Update Score" button
          fireEvent.click(screen.getByRole('button', { name: /finish match/i }));
    
          // Assert that the match has been removed
          await waitFor(() => {
            expect(scoreboardService.matches.length).toBe(0);
          });
        });
    });

});
