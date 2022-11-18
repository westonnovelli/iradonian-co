import React from 'react';
import { fetchPlayerByAllyCode, ParsedPlayer } from '../get-players';
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

const GLShips = [{
    shortName: 'Exe',
    baseId: 'CAPITALEXECUTOR',
    lookupUnit: 'ADMIRALPIETT'
}, {
    shortName: 'Pro',
    baseId: 'CAPITALPROFUNDITY',
    lookupUnit: 'ADMIRALRADDUS'
}];

// https://wiki.swgoh.help/wiki/Omicron_List#Territory_War
const TWOmicrons = [{
    baseId: 'BOBAFETTSCION',
    shortName: 'OLD BOBA',
    twOmicrons: [
        { ability: "specialskill_BOBAFETTSCION01", key: 'S' },
        { ability: "leaderskill_BOBAFETTSCION", key: 'L' },
        { ability: "uniqueskill_BOBAFETTSCION01", key: 'U' },
    ]
}, {
    baseId: 'PHASMA',
    shortName: 'PHA',
    twOmicrons: [
        { ability: "leaderskill_PHASMA", key: 'L' },
    ]
}, {
    baseId: 'CHIEFNEBIT',
    shortName: 'NEB',
    twOmicrons: [
        { ability: "leaderskill_CHIEFNEBIT", key: 'L' },
    ]
}, {
    baseId: 'DARTHSIDIOUS',
    shortName: 'SID',
    twOmicrons: [
        { ability: "uniqueskill_DARTHSIDIOUS01", key: 'U' },
    ]
}, {
    baseId: 'EIGHTHBROTHER',
    shortName: '8th',
    twOmicrons: [
        { ability: "leaderskill_EIGHTHBROTHER", key: 'L' },
    ]
}, {
    baseId: 'EMBO',
    shortName: 'EMB',
    twOmicrons: [
        { ability: "uniqueskill_EMBO01", key: 'U' },
    ]
}, {
    baseId: 'FIFTHBROTHER',
    shortName: '5th',
    twOmicrons: [
        { ability: "leaderskill_FIFTHBROTHER", key: 'L' },
    ]
}, {
    baseId: 'GRANDINQUISITOR',
    shortName: 'Grd Inq',
    twOmicrons: [
        { ability: "specialskill_GRANDINQUISITOR02", key: 'S' },
        { ability: "leaderskill_GRANDINQUISITOR", key: 'L' },
        { ability: "uniqueskill_GRANDINQUISITOR01", key: 'U' },
    ]
}, {
    baseId: 'HERASYNDULLAS3',
    shortName: 'HERA',
    twOmicrons: [
        { ability: "leaderskill_HERASYNDULLAS3", key: 'L' },
    ]
}, {
    baseId: 'JYNERSO',
    shortName: 'JYN',
    twOmicrons: [
        { ability: "uniqueskill_JYNERSO01", key: 'U' },
    ]
}, {
    baseId: 'LUKESKYWALKER',
    shortName: 'FARM',
    twOmicrons: [
        { ability: "uniqueskill_LUKESKYWALKER01", key: 'U' },
    ]
}, {
    baseId: 'MACEWINDU',
    shortName: 'MACE',
    twOmicrons: [
        { ability: "uniqueskill_MACEWINDU02", key: 'U' },
    ]
}, {
    baseId: 'MARAJADE',
    shortName: 'MJ',
    twOmicrons: [
        { ability: "uniqueskill_MARAJADE01", key: 'U' },
    ]
}, {
    baseId: 'NINTHSISTER',
    shortName: '9th',
    twOmicrons: [
        { ability: "leaderskill_NINTHSISTER", key: 'L' },
    ]
}, {
    baseId: 'SECONDSISTER',
    shortName: '2nd',
    twOmicrons: [
        { ability: "leaderskill_SECONDSISTER", key: 'L' },
    ]
}, {
    baseId: 'SEVENTHSISTER',
    shortName: '7th',
    twOmicrons: [
        { ability: "leaderskill_SEVENTHSISTER", key: 'L' },
    ]
}, {
    baseId: 'UNDERCOVERLANDO',
    shortName: 'SKIF',
    twOmicrons: [
        { ability: "uniqueskill_UNDERCOVERLANDO01", key: 'U' },
    ]
}, {
    baseId: 'T3_M4',
    shortName: 'T3M4',
    twOmicrons: [
        { ability: "uniqueskill_t3_m4_02", key: 'U' },
    ]
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
            <label>Ally Code</label><a className="profile-link" href={`https://swgoh.gg/p/196111371/`} target="_blank">{formatAllyCode(player.ally_code)}<NewTab /></a>
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
            {/* <label>TW Omicrons</label>
            <div className="omi-grid">
                <table>
                    <thead>
                        <tr>
                            {TWOmicrons.map((unit) => (
                                <th key={unit.baseId} colSpan={unit.twOmicrons.length}>{unit.shortName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {TWOmicrons.map((omicronUnit) => {
                                const hasThisUnit = player.units.find((unit) => unit.base_id === omicronUnit.baseId);
                                const omicrons = omicronUnit.twOmicrons.map(({ ability, key }) => hasThisUnit?.omicron_abilities.includes(ability) ? key : '');

                                return omicrons.map((abilityKey, i) => (
                                    <td key={`${omicronUnit.baseId}-${i}`}>{abilityKey}</td>
                                ));
                            })}
                        </tr>
                    </tbody>
                </table>
            </div> */}
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
