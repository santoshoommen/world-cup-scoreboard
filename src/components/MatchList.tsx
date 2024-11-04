import Match from '../models/Match';

interface MathListProps {
    matches: Match[];
}

const MatchList = ({ matches }: MathListProps) => {
    return (
        <div className="match-list">
            <h2>Match List</h2>
            <ul>
                {matches.map((match) => (
                    <li key={match.id}>{match.homeTeam}  {match.homeScore} - {match.awayScore} {match.awayTeam} </li>
                ))}
            </ul>
        </div>
    )
}

export default MatchList;