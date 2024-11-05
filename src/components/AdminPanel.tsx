import { useEffect, useState } from "react";
import ScoreboardService from '../services/ScoreboardService';
import { flushSync } from 'react-dom';

interface AdminPanelProps {
  scoreboardService: ScoreboardService;
}

const AdminPanel = ({ scoreboardService }: AdminPanelProps) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);
  const [matchIdToUpdate, setMatchIdToUpdate] = useState<number | null>(null);
  const [selectedMatchToUpdate, setSelectedMatchToUpdate] = useState<number | null>(null);
  const [selectedMatchToFinish, setSelectedMatchToFinish] = useState<number | null>(null);
  const [homeScoreToUpdate, setHomeScoreToUpdate] = useState(0);
  const [awayScoreToUpdate, setAwayScoreToUpdate] = useState(0);
  const [matchIdToFinish, setMatchIdToFinish] = useState<number | null>(null);
  
  const handleStartMatch = () => {
    flushSync(() => {
      scoreboardService.startMatch(homeTeam, awayTeam);
    });
    setHomeTeam('');
    setAwayTeam('');
    setForceUpdate(prev => !prev);
  }

  const handleUpdateScore = () => {
    if (typeof selectedMatchToUpdate === 'number') {
      const matchToUpdate = scoreboardService.matches.find(match => match.id === selectedMatchToUpdate);
      if (matchToUpdate !== null) {
        scoreboardService.updateScore(selectedMatchToUpdate, homeScoreToUpdate, awayScoreToUpdate);
        setMatchIdToUpdate(null);
        setHomeScoreToUpdate(0);
        setAwayScoreToUpdate(0);
      }
    }
  };


  useEffect(() => {
    // Update score from match object when selected match changes
    if (selectedMatchToUpdate !== null) {
      const match = scoreboardService.matches.find(match => match.id === selectedMatchToUpdate);
      if (match) {
        setHomeScoreToUpdate(match.homeScore);
        setAwayScoreToUpdate(match.awayScore);
      }
    } else {
      // Reset to 0 when no match is selected
      setHomeScoreToUpdate(0);
      setAwayScoreToUpdate(0);
    }
  }, [selectedMatchToUpdate, scoreboardService.matches]); 

  const handleFinishMatch = () => {
    if (selectedMatchToFinish !== null) {
      scoreboardService.finishMatch(selectedMatchToFinish);
      setSelectedMatchToFinish(null);
    }
  };

  return (
    <div className="admin-panel">
  <h2>Admin Panel</h2>
  <h3>Start Match</h3>  
  <div className="form-group">
    <div className="form-field">
      <label htmlFor="homeTeam">Home Team:</label>
      <input 
        type="text" 
        id="homeTeam"
        value={homeTeam}
        onChange={(e) => setHomeTeam(e.target.value)}
      />
    </div>
    <div className="form-field">
      <label htmlFor="awayTeam">Away Team:</label>
      <input
        type="text"
        id="awayTeam"
        value={awayTeam}
        onChange={(e) => setAwayTeam(e.target.value)}
      />
    </div>
    <button onClick={handleStartMatch}>Start Match</button>
  </div>

  <h3>Update Score</h3>
  <div className="form-group">
    <div className="form-field">
      <label htmlFor="matchToUpdate">Match to Update:</label>
      <select
        id="matchToUpdate"
        value={selectedMatchToUpdate === null ? '' : selectedMatchToUpdate}
        onChange={(e) => setSelectedMatchToUpdate(Number(e.target.value))}>
        <option value="">Select a match</option>
        {scoreboardService.matches.map((match) => (
          <option key={match.id} value={match.id}>
            {match.homeTeam} vs {match.awayTeam}
          </option>
        ))}
      </select>
    </div>
    <div className="form-field">
      <label htmlFor="homeScoreToUpdate">Home Score:</label>
      <input
        type="number"
        id="homeScoreToUpdate"
        value={homeScoreToUpdate}
        onChange={(e) => setHomeScoreToUpdate(Number(e.target.value))}
      />
    </div>
    <div className="form-field">
      <label htmlFor="awayScoreToUpdate">Away Score:</label>
      <input
        type="number"
        id="awayScoreToUpdate"
        value={awayScoreToUpdate}
        onChange={(e) => setAwayScoreToUpdate(Number(e.target.value))}
      />
    </div>
    <button onClick={handleUpdateScore}>Update Score</button>
  </div>

  <h3>Finish Match</h3>
  <div className="form-group">
    <div className="form-field">
      <label htmlFor="matchToFinish">Match to finish:</label>
      <select
        id="matchToFinish"
        value={selectedMatchToFinish === null ? '' : selectedMatchToFinish}
        onChange={(e) => setSelectedMatchToFinish(Number(e.target.value))}>
        <option value="">Select a match</option>
        {scoreboardService.matches.map((match) => (
          <option key={match.id} value={match.id}>
            {match.homeTeam} vs {match.awayTeam}
          </option>
        ))}
      </select>
    </div>
    <button onClick={handleFinishMatch}>Finish Match</button>
  </div>

</div>
  );
};
export default AdminPanel;