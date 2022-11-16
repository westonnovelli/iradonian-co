'use client';

import type { GuildProfile, Member } from '../guild-profile.types';
import React from 'react';

import MemberC from '../member/Member';
import Matchup from './Matchup';

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

export const SORTS: Record<string, {
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

function getMatchingNode(value: string, node: React.ReactNode): React.ReactNode {
    if (!node || value === '') return null;
    if (typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') return null;
    try {
        // @ts-expect-error
        return node.filter(({ key }: { key: string }) => key === value);
    } catch (e) {
        return null;
    }
}

const MatchupList = (props: { guild1: GuildProfile, guild2: GuildProfile, sortingDimension: keyof typeof SORTS, children: React.ReactNode }) => {
    const sortingDimension = props?.sortingDimension ?? 'GP';
    const g1members = props.guild1?.members?.sort(SORTS[sortingDimension].sort) || [];
    const g2members = props.guild2?.members?.sort(SORTS[sortingDimension].sort) || [];

    return (
        <div className="player-matchup">
            <ul>
                {Array.from(Array(50)).map((_, i) => {
                    const g1 = g1members[i];
                    const g2 = g2members[i];

                    const g1Details = g1 ? getMatchingNode(g1.ally_code ? `${g1.ally_code}` : '', props.children) : null;
                    const g2Details = g2 ? getMatchingNode(g2.ally_code ? `${g2.ally_code}` : '', props.children) : null;
                    if (g1 && g2) {
                        return (
                            <li key={i}>
                                <MemberC member={g1}>
                                    <React.Suspense fallback={null}>
                                        {g1Details}
                                    </React.Suspense>
                                </MemberC>
                                <Matchup a={g1} b={g2} compareTo={SORTS[sortingDimension].compare} />
                                <MemberC member={g2} rtl>
                                    <React.Suspense fallback={null}>
                                        {g2Details}
                                    </React.Suspense>
                                </MemberC>
                            </li>
                        );
                    } else if (g1 && !g2) {
                        return (
                            <li key={i}>
                                <MemberC member={g1}>
                                    <React.Suspense fallback={null}>
                                        {g1Details}
                                    </React.Suspense>
                                </MemberC>
                            </li>
                        );
                    } else if (!g1 && g2) {
                        return (
                            <li key={i}>
                                <div />
                                <div />
                                <MemberC member={g2} rtl>
                                    <React.Suspense fallback={null}>
                                        {g2Details}
                                    </React.Suspense>
                                </MemberC>
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}
            </ul>
        </div>
    );
};

export default MatchupList;
