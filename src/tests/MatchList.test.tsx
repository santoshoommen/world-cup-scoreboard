import {render, screen} from '@testing-library/react';
import Match from '../models/Match';
import { MatchStatus } from '../models/MatchStatus';
import MatchList from '../components/MatchList';

describe('Match List', ()=> {
    test('should render the MatchList component with no matches', () => {
        render(<MatchList matches={[]} />);
        expect(screen.getByRole('heading', { name: /match list/i })).toBeInTheDocument();
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument(); // No list items
      });
    
      test('should render the MatchList component with multiple matches', () => {
        const matches: Match[] = [
            new Match('Brazil', 'Argentina'),
            new Match('Germany', 'France'),
          ];
      
          matches[0].startMatch();
          matches[0].updateScore(2, 1);
          matches[1].startMatch(); 
          matches[1].updateScore(0, 0); 
        render(<MatchList matches={matches} />);
    
        expect(screen.getByRole('heading', { name: /match list/i })).toBeInTheDocument();
    
        // Check if the correct number of list items are rendered
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    
        // Check if the match information is displayed correctly
        expect(listItems[0]).toHaveTextContent('Brazil 2 - 1 Argentina');
        expect(listItems[1]).toHaveTextContent('Germany 0 - 0 France');
      });
});
