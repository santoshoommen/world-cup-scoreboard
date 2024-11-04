import Match from '../models/Match';

interface MatchSummaryProps {
    matches: Match[];
}

const MatchSummary = ({ matches }: MatchSummaryProps) => {
    return (
        <div>
            <h2>Match Summary</h2>
            {matches.length > 0 ? (
                <table className="match-table">
                    <thead>
                        <tr>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Score</th>
                            <th>Start Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match) => (
                            <tr key={match.id}><td>{match.homeTeam}</td><td>{match.awayTeam}</td><td>{match.homeScore} - {match.awayScore}</td><td>{match.startTime?.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                <p>No matches found</p>
            )}
        </div>
    )
}
export default MatchSummary;