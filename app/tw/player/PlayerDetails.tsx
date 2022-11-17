import React from 'react';
import { fetchPlayerByAllyCode } from '../get-players';
import type { Unit } from '../player.types';
import './PlayerDetails.css';

function formatAllyCode(allyCode: number) {
    const asString = allyCode.toString();
    const first = asString.slice(0, 3);
    const second = asString.slice(3, 6);
    const third = asString.slice(6);
    return `${first}-${second}-${third}`;
}

function getGearOrRelicLevel(unit: Unit) {
    if (unit.gear_level < 13) {
        return `G${unit.gear_level}`;
    } else {
        return `R${unit.relic_tier - 2}`;
    }
}

const GLs = [{
    shortName: 'Rey',
    baseId: 'REY',
}, {
    shortName: 'SLKR',
    baseId: 'SUPREMELEADERKYLOREN',
}, {
    shortName: 'JML',
    baseId: 'GRANDMASTERLUKE',
}, {
    shortName: 'SEE',
    baseId: 'SITHPALPATINE',
}, {
    shortName: 'JMK',
    baseId: 'JEDIMASTERKENOBI',
}, {
    shortName: 'LV',
    baseId: 'LORDVADER',
}, {
    shortName: 'JTH',
    baseId: 'JABBATHEHUTT',
}];

const PlayerDetails = async ({ allyCode }: { allyCode: string }) => {
    const player = await fetchPlayerByAllyCode(allyCode);
    const ownedGLs = player.units.filter((unit) => unit.is_galactic_legend);
    return (
        <div key={player.ally_code} className="player-details">
            <label>Ally Code</label>{formatAllyCode(player.ally_code)}
            <label>Skill Rating</label>{player.skill_rating}
            <label>GLS</label>
            <div className="gl-grid">
                <table>
                    <thead>
                        <tr>
                            {GLs.map((gl) => (
                                <th key={gl.baseId}>{gl.shortName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {GLs.map((gl) => {
                                const hasThisGl = ownedGLs.find((ownedGl) => ownedGl.base_id === gl.baseId);
                                const hasUltimate = hasThisGl?.has_ultimate ?? false;
                                const gearLevel = hasThisGl !== undefined ? getGearOrRelicLevel(hasThisGl) : '';

                                return (
                                    <td key={gl.baseId} className={hasUltimate ? 'ultimate' : ''}>{gearLevel}</td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default PlayerDetails;
