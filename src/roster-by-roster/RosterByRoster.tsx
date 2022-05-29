import React from 'react';
import Matchup from '../comparison/Matchup';
import type { GuildProfile, Member } from '../data/guild-profile/guild-profile.types';
import MemberC from '../member/Member';
import './RosterByRoster.css';
import './Responsive.css';

interface Props {
    guild1: GuildProfile;
    guild2: GuildProfile
}

const GuildSummary: React.FC<Props['guild1']> = (guild) => {
    return (
        <div className="guild-profile">
            <h1>{guild.name}</h1>
            {guild.banner_logo_id && <img src={`https://swgoh.gg/static/img/assets/tex.${guild.banner_logo_id}.png`} />}
            <div><label>Total GP</label> {guild.galactic_power?.toLocaleString('en-us')}</div>
            <div><label>Average GAC Skill Rating</label> {guild.avg_skill_rating}</div>
            <div><label>Size</label> {guild.member_count} of 50</div>
        </div>
    );

}

const LEAGUES: Record<string, number> = {
    KYBER: 10,
    AURODIUM: 9,
    BRONZIUM: 8,
    CHROMIUM: 7,
    CARBONITE: 6,
    none: 0,
};

type SortingFn = (a: Member, b: Member) => number;
type CompareFn = (a: Member, b: Member) => [boolean, boolean, boolean];

const SORTS: Record<string, {
    sort: SortingFn,
    compare: CompareFn
}> = {
    GP: {
        sort: (a: Member, b: Member) => b.galactic_power - a.galactic_power,
        compare: (a: Member, b: Member) => [
                a.galactic_power > b.galactic_power,
                a.galactic_power < b.galactic_power,
                a.galactic_power === b.galactic_power,
            ]
    },
    L: {
        sort: (a: Member, b: Member) => {
            const aLeague = LEAGUES[a.league_id || 'none'];
            const bLeague = LEAGUES[b.league_id || 'none'];
            if (aLeague === bLeague) {
                return SORTS.GP.sort(b, a);
            }
            return bLeague - aLeague;
        },
        compare: (a: Member, b: Member) => [
            LEAGUES[a.league_id || 'none'] > LEAGUES[b.league_id || 'none'],
            LEAGUES[a.league_id || 'none'] < LEAGUES[b.league_id || 'none'],
            LEAGUES[a.league_id || 'none'] === LEAGUES[b.league_id || 'none'],
        ]
    }
}

const RosterByRoster: React.FC<Props> = ({guild1, guild2}) => {
    const [sortingDimension, setSortingDimension] = React.useState('GP');
    const g1members = guild1?.members?.sort(SORTS[sortingDimension].sort) || [];
    const g2members = guild2?.members?.sort(SORTS[sortingDimension].sort) || [];
    return (
        <div className="roster-by-roster">
            <div className="summary">
                <GuildSummary {...guild1} />
                <GuildSummary {...guild2} />
            </div>
            {g1members.length + g2members.length > 0 && (
                <div className="matchup-dimension">
                    Sort rosters by:
                    <select onChange={(e) => {
                        setSortingDimension(e.target.value);
                    }}>
                        <option value="GP">Galactic Power (GP)</option>
                        <option value="L">GAC League</option>
                    </select>
                </div>
            )}
            <div className="player-matchup">
                <ul>
                    {Array.from(Array(50)).map((_, i) => {
                        const g1 = g1members[i];
                        const g2 = g2members[i];
                        if (g1 && g2) {
                            return (
                                <li key={i}>
                                    <MemberC member={g1}/>
                                    <Matchup a={g1} b={g2} compareTo={SORTS[sortingDimension].compare} />
                                    <MemberC member={g2} rtl/>
                                </li>
                            );
                        } else if (g1 && !g2) {
                            return <li key={i}><MemberC member={g1}/></li>;
                        } else if (!g1 && g2) {
                            return <li key={i}><MemberC member={g2}/></li>;
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default RosterByRoster;
