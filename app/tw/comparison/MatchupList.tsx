import type { Member } from '../guild-profile.types';
import React from 'react';

import MemberC from '../member/Member';
import Matchup from './Matchup';
import getGuildProfile from '../get-guild-profile';

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
};

const MatchupList = async (props: { searchParams: { guild: string }, sortingDimension: keyof typeof SORTS }) => {
    const guildId = props?.searchParams?.guild;

    const guild1 = await getGuildProfile();
    const guild2 = await getGuildProfile(guildId);

    const sortingDimension = props?.sortingDimension ?? 'GP';
    const g1members = guild1?.members?.sort(SORTS[sortingDimension].sort) || [];
    const g2members = guild2?.members?.sort(SORTS[sortingDimension].sort) || [];

    return (
        <div className="player-matchup">
            <ul>
                {Array.from(Array(50)).map((_, i) => {
                    const g1 = g1members[i];
                    const g2 = g2members[i];
                    if (g1 && g2) {
                        return (
                            <li key={i}>
                                <MemberC member={g1} />
                                <Matchup a={g1} b={g2} compareTo={SORTS[sortingDimension].compare} />
                                <MemberC member={g2} rtl />
                            </li>
                        );
                    } else if (g1 && !g2) {
                        return <li key={i}><MemberC member={g1} /></li>;
                    } else if (!g1 && g2) {
                        return <li key={i}><div /><div /><MemberC member={g2} rtl /></li>;
                    } else {
                        return null;
                    }
                })}
            </ul>
        </div>
    );
};

export default MatchupList;
