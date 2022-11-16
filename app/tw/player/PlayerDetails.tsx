import React from 'react';
import { fetchPlayerByAllyCode } from '../get-players';

const PlayerDetails = async ({ allyCode }: { allyCode: string }) => {
    const player = await fetchPlayerByAllyCode(allyCode);
    return (
        <div key={player.ally_code}>
            {player.ally_code}
            {player.skill_rating}
            {player.units.filter((unit) => unit.is_galactic_legend).map((unit) => (
                <span key={unit.base_id}>{unit.name}</span>
            ))}
        </div>
    )
};

export default PlayerDetails;
