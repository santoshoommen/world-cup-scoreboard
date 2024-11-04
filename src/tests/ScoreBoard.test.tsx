import {screen, render, fireEvent} from '@testing-library/react';
import Scoreboard from '../components/ScoreBoard';

describe('Scoreboard', () => {
  test('should render the Scoreboard component with the scoreboard tab active by default', () => {
    render(<Scoreboard />);

    expect(screen.getByRole('button', { name: /admin panel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /scoreboard/i })).toBeInTheDocument();

    // Check if the MatchList and MatchSummary components are rendered (assuming they have headings)
    expect(screen.getByRole('heading', { name: /match list/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /match summary/i })).toBeInTheDocument();

    // Check if the AdminPanel is not rendered
    expect(screen.queryByRole('heading', { name: /admin panel/i })).not.toBeInTheDocument(); 
  });

  test('should switch to the admin panel tab when the "Admin Panel" button is clicked', () => {
    render(<Scoreboard />);

    // Click the "Admin Panel" button
    fireEvent.click(screen.getByRole('button', { name: /admin panel/i }));

    // Check if the AdminPanel is rendered
    expect(screen.getByRole('heading', { name: /admin panel/i })).toBeInTheDocument();

    // Check if the MatchList and MatchSummary are not rendered
    expect(screen.queryByRole('heading', { name: /match list/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /match summary/i })).not.toBeInTheDocument();
  });

});