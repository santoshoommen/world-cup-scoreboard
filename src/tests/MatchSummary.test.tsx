import { screen, render, within } from '@testing-library/react';
import Match from '../models/Match';
import MatchSummary from '../components/MatchSummary';
import { MatchStatus } from '../models/MatchStatus';

describe('Match Summary', () => {
    test('should render the match summary with no matches', () => {
        render(<MatchSummary matches={[]} />);
        expect(screen.getByRole('heading', { name: /match summary/i }));
        expect(screen.getByText('No matches found')).toBeInTheDocument();
    })

    test('should render the match summary with matches', () => {
        const matches: Match[] = [
            new Match('Brazil', 'Argentina'),
            new Match('Germany', 'France'),
          ];
      
          matches[0].startMatch();
          matches[0].updateScore(2, 1);
          matches[1].startMatch(); 
          matches[1].updateScore(0, 0); 

        const matchRowMatcher = (match: Match) => (content: string, element: HTMLElement) => {
            const cells = within(element).getAllByRole('cell'); // Get all cells in the row
            return (
              cells[0].textContent === match.homeTeam &&
              cells[1].textContent === match.awayTeam &&
              cells[2].textContent === `${match.homeScore} - ${match.awayScore}`
            );
        };

        render(<MatchSummary matches={matches} />);
        const table = screen.getByRole('table');
        const rows = within(table).getAllByRole('row');
        expect(matchRowMatcher(matches[0])('', rows[1])).toBe(true);
        expect(matchRowMatcher(matches[1])('', rows[2])).toBe(true);
        
    });

});