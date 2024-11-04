import { useState } from "react";
import ScoreboardService from "../services/ScoreboardService";  
import MatchList from "../components/MatchList";
import MatchSummary from "../components/MatchSummary"; 
import AdminPanel from "./AdminPanel";


const scoreboardService = new ScoreboardService();
const Scoreboard = () => {
    const [activeTab, setActiveTab] = useState<'admin' | 'scoreboard'>('scoreboard');
    const handleTabChange = (tab: 'admin' | 'scoreboard') => {
        setActiveTab(tab);
    };

    return (
        <div className="scoreboard">
      <div>
        <button onClick={() => handleTabChange('admin')}>Admin Panel</button>
        <button onClick={() => handleTabChange('scoreboard')}>Scoreboard</button>
      </div>

      {activeTab === 'admin' && (
        <AdminPanel scoreboardService={scoreboardService} />
      )}

      {activeTab === 'scoreboard' && (
        <div>
          <MatchList matches={scoreboardService.matches} />
          <MatchSummary matches={scoreboardService.getSummary()} />
        </div>
      )}
    </div>
    );
}

export default Scoreboard;