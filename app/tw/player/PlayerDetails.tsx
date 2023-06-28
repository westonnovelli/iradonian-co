import React from 'react';
import { fetchPlayerByAllyCode, ParsedPlayer } from '../get-players';
import { getTWOmicronCount } from '../omicrons';
import type { Datacron, Mod, Unit } from '../player.types';
import { NewTab } from './icons';
import './PlayerDetails.css';
import './Responsive.css';

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
    baseId: 'GLREY',
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

const GLShips = [{
    shortName: 'Exe',
    baseId: 'CAPITALEXECUTOR',
    lookupUnit: 'ADMIRALPIETT'
}, {
    shortName: 'Pro',
    baseId: 'CAPITALPROFUNDITY',
    lookupUnit: 'ADMIRALRADDUS'
}];

type ModSecondaryStat = 'Speed';

function getModCountBySecondaryStat(player: ParsedPlayer, targetStat: ModSecondaryStat, lowerThreshold: number, upperThreshold: number): number {
    const match = player.mods.filter((mod) =>
        mod.secondary_stats.some((stat) =>
            stat.name === targetStat && stat.value >= lowerThreshold && stat.value < upperThreshold
        )
    );
    return match.length;
}

type ModStatMatch = [keyof Mod, string | number];

function getModCountByFields(player: ParsedPlayer, matchers: ModStatMatch[]) {
    const match = player.mods.filter((mod) =>
        matchers.every(([targetField, targetValue]) =>
            mod[targetField] === targetValue
        )
    );
    return match.length;
}

// type DatacronStatMatch = [keyof Datacron, string | number | boolean];

function getDatacronCountByTier(player: ParsedPlayer, upper: number, lower = 1) {
    const match = player.datacrons.filter(({ tier }) =>
        tier >= lower && tier < upper
    );
    return match.length;
}


const PlayerDetails = async ({ allyCode }: { allyCode: string }) => {
    const player = await fetchPlayerByAllyCode(allyCode);
    const ownedGLs = player.units.filter((unit) => unit.is_galactic_legend);
    return (
        <div key={player.ally_code} className="player-details">
            <label>Ally Code</label><a className="profile-link" href={`https://swgoh.gg${player.url}`} target="_blank">{formatAllyCode(player.ally_code)}<NewTab /></a>
            <label>Skill Rating</label>{player.skill_rating}
            <label>GLS</label>
            <div className="gl-grid">
                <table>
                    <thead>
                        <tr>
                            {GLs.map((gl) => (
                                <th key={gl.baseId}>{gl.shortName}</th>
                            ))}
                            {GLShips.map((gl) => (
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
                            {GLShips.map((gl) => {
                                const hasThisShip = player.units.find((unit) => unit.base_id === gl.baseId);
                                if (!hasThisShip) return <td key={gl.baseId}></td>

                                const hasThisGl = player.units.find((unit) => unit.base_id === gl.lookupUnit);
                                const hasUltimate = hasThisShip.rarity === 7;
                                const gearLevel = hasThisGl !== undefined ? getGearOrRelicLevel(hasThisGl) : '';

                                return (
                                    <td key={gl.baseId} className={hasUltimate ? 'ultimate' : ''}>{gearLevel}</td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <label>TW Omicrons</label>{getTWOmicronCount(player)}
            <label>Speed Mods</label>
            <div className="mods">
                <div><label>25+</label>{getModCountBySecondaryStat(player, 'Speed', 25_0000, 99_999_999)}</div>
                <div><label>20+</label>{getModCountBySecondaryStat(player, 'Speed', 20_0000, 25_0000)}</div>
                <div><label>15+</label>{getModCountBySecondaryStat(player, 'Speed', 15_0000, 20_0000)}</div>
            </div>
            <label>6 dot Mods</label>
            <div className="mods">
                <div><label>6A</label>{getModCountByFields(player, [['rarity', 6], ['tier', 5]])}</div>
                <div><label>6B</label>{getModCountByFields(player, [['rarity', 6], ['tier', 4]])}</div>
                <div><label>6C</label>{getModCountByFields(player, [['rarity', 6], ['tier', 3]])}</div>
                <div><label>6D</label>{getModCountByFields(player, [['rarity', 6], ['tier', 2]])}</div>
                <div><label>6E</label>{getModCountByFields(player, [['rarity', 6], ['tier', 1]])}</div>
            </div>
            <label>Datacrons</label>
            <div className="mods">
                <div><label>9</label>{getDatacronCountByTier(player, 10, 9)}</div>
                <div><label>6</label>{getDatacronCountByTier(player, 9, 6)}</div>
                <div><label>3</label>{getDatacronCountByTier(player, 6, 3)}</div>
                <div><label>1</label>{getDatacronCountByTier(player, 3)}</div>
            </div>
        </div>
    )
};

export default PlayerDetails;

