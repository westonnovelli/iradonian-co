'use client';

import type { GuildProfile, Member } from '../guild-profile.types';
import React from 'react';

import MemberC from '../member/Member';
import Matchup from './Matchup';
import { SORTS } from '../sort/sort';
import { useSort } from '../sort/SortContext';


function getMatchingNode(value: string, node: React.ReactNode): React.ReactNode {
    if (!node || value === '') return null;
    if (typeof node === 'boolean' || typeof node === 'string' || typeof node === 'number') return null;
    try {
        // @ts-expect-error
        return node.find(({ key }: { key: string }) => key === value);
    } catch (e) {
        return null;
    }
}

const MatchupList = (props: { guild1: GuildProfile, guild2: GuildProfile, children: React.ReactNode }) => {
    const { sortingDimension } = useSort();
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
                                    {g1Details}
                                </MemberC>
                                <Matchup a={g1} b={g2} compareTo={SORTS[sortingDimension].compare} />
                                <MemberC member={g2} rtl>
                                    {g2Details}
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
