import type { GuildProfile } from './guild-profile.types';
import type { Root, Player, Unit, UnitBlob } from './player.types';
import { Player_short } from './mocks_short';

import React from 'react';

const mock = false;

const parseUnit = (unit: any): Unit => {
    const data = unit.data ?? {};
    return {
        base_id: data.base_id,
        name: data.name,
        gear_level: data.gear_level,
        level: data.level,
        power: data.power,
        rarity: data.rarity,
        url: data.url,
        zeta_abilities: data.zeta_abilities,
        omicron_abilities: data.omicron_abilities,
        relic_tier: data.relic_tier,
        has_ultimate: data.has_ultimate,
        is_galactic_legend: data.is_galactic_legend,
    };
}

type ParsedPlayer = Player & { units: Root['units'] };

const parsePlayer = (player: any): ParsedPlayer => {
    const { data, units } = player ?? {};
    return {
        ally_code: data.ally_code,
        arena_leader_base_id: data.arena_leader_base_id,
        arena_rank: data.arena_rank,
        level: data.level,
        name: data.name,
        galactic_power: data.galactic_power,
        character_galactic_power: data.character_galactic_power,
        ship_galactic_power: data.ship_galactic_power,
        skill_rating: data.skill_rating,
        division_number: data.division_number,
        league_name: data.league_name,
        last_updated: data.last_updated,
        url: data.url,
        units: units.map(parseUnit)
    };
}

const fetchPlayerByAllyCode = async (allyCode: string): Promise<ParsedPlayer> => {
    if (!mock) {
        const response = await fetch(`https://swgoh.gg/api/player/${allyCode}`);
        try {
            const json = await response.json() ?? {};
            return parsePlayer(json);
        } catch (e) {
            console.error(e);
        }
    }
    return Promise.resolve(parsePlayer(Player_short));
}

const getPlayers = async (playerList: string[]): Promise<ParsedPlayer[]> => {
    const responses = await Promise.all(playerList.map(fetchPlayerByAllyCode));
    return responses;
}

const getAggregations = (players: ParsedPlayer[]) => players.reduce((acc, { units = [] }) => {
    if (units.length === 0) acc.missingAny = true;
    acc.glCount += units.filter(unit => unit.is_galactic_legend).length;
    acc.ultimateCount += units.filter(unit => unit.has_ultimate).length;
    return acc;
}, {
    glCount: 0,
    ultimateCount: 0,
    missingAny: false,
});

type Props = GuildProfile;

const GuildAggregate = async ({ guild }: { guild: GuildProfile }) => {
    const allyCodes = (guild?.members ?? [])
        .map((member) => member?.ally_code?.toString() ?? '')
        .filter(x => x !== '');
    const players = await getPlayers(allyCodes);
    const { glCount, ultimateCount, missingAny } = getAggregations(players);
    return (
        <div>
            <label title={missingAny ? 'Some rosters were not counted, could be more' : ''}>
                GL Count{missingAny ? '*' : ''}
            </label>
            {' '}{glCount}{' '}
            <label>(Ults)</label>
            {' '}{ultimateCount}
        </div>
    );
};

const GuildSummary: React.FC<Props> = (guild) => {
    return (
        <div className="guild-profile">
            <h1 title={guild.name}>{guild.name}</h1>
            {guild.banner_logo_id && <img src={`https://swgoh.gg/static/img/assets/tex.${guild.banner_logo_id}.png`} />}
            <div><label>Total GP</label> {guild.galactic_power?.toLocaleString('en-us')}</div>
            <div><label>Average GAC Skill Rating</label> {guild.avg_skill_rating}</div>
            <div><label>Size</label> {guild.member_count} of 50</div>
            {/* @ts-expect-error Server Component */}
            <GuildAggregate guild={guild} />
        </div>
    );
};

export default GuildSummary;
