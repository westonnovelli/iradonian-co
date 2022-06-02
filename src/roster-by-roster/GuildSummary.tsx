import type { GuildProfile } from '../data/guild-profile/guild-profile.types';
import type { Root as Player } from '../data/player/player.types';

import React from 'react';
import usePlayers from '../data/player/use-players';
import AggLoader from './AggLoader';

type Props = GuildProfile;

const getAggregations = (players: Player[]) => players.reduce((acc, { units = [] }) => {
    if (units.length === 0) acc.missingAny = true;
    acc.glCount += units.filter(unit => unit.is_galactic_legend).length;
    acc.ultimateCount += units.filter(unit => unit.has_ultimate).length;
    return acc;
}, {
    glCount: 0,
    ultimateCount: 0,
    missingAny: false,
});

const GuildSummary: React.FC<Props> = (guild) => {
    const members = guild?.members ?? [];
    const allyCodes = React.useMemo(
        () => members
            .map((member) => member?.ally_code?.toString() ?? '')
            .filter(x => x !== '')
        , [guild.guild_id]);
    const { players = [], loading: loadingPlayerAggregations } = usePlayers(allyCodes);
    const { glCount, ultimateCount, missingAny } = getAggregations(players);

    return (
        <div className="guild-profile">
            <h1 title={guild.name}>{guild.name}</h1>
            {guild.banner_logo_id && <img src={`https://swgoh.gg/static/img/assets/tex.${guild.banner_logo_id}.png`} />}
            <div><label>Total GP</label> {guild.galactic_power?.toLocaleString('en-us')}</div>
            <div><label>Average GAC Skill Rating</label> {guild.avg_skill_rating}</div>
            <div><label>Size</label> {guild.member_count} of 50</div>
            {loadingPlayerAggregations ? <AggLoader />
                : (
                    <div>
                        <label title={missingAny ? 'Some rosters were not counted, could be more': ''}>
                            GL Count{missingAny ? '*': ''}
                        </label>
                        {' '}{glCount}{' '}
                        <label>(Ults)</label>
                        {' '}{ultimateCount}
                    </div>
                )
            }
        </div>
    );
};

export default GuildSummary;
