import React from 'react';
import { fetchPlayerByAllyCode } from '../get-players';
import './PlayerDetails.css';

const PlayerDetails = async ({ allyCode }: { allyCode: string }) => {
    const player = await fetchPlayerByAllyCode(allyCode);
    return (
        <div key={player.ally_code} className="player-details">
            <label>Ally Code</label>{player.ally_code}
            <label>Skill Rating</label>{player.skill_rating}
            <label>GLS</label>
            <div>
                {player.units.filter((unit) => unit.is_galactic_legend).map((unit) => (
                    <span key={unit.base_id}>{unit.name}</span>
                ))}
            </div>
        </div>
    )
};

export default PlayerDetails;
