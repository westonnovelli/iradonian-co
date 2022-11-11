'use client';

import React from 'react';
import MatchupList, { SORTS } from './MatchupList';
import { GuildProfile } from '../guild-profile.types';

const WithSortControls = ({ guild1, guild2 }: { guild1: GuildProfile, guild2: GuildProfile }) => {
    const [sortingDimension, setSortingDimension] = React.useState(Object.keys(SORTS)[0]);

    return (
        <>
            <div className="matchup-dimension">
                Sort rosters by:
                <select onChange={(e) => {
                    setSortingDimension(e.target.value);
                }}>
                    <option value="GP">Galactic Power (GP)</option>
                    <option value="L">GAC League</option>
                </select>
            </div>
            <MatchupList guild1={guild1} guild2={guild2} sortingDimension={sortingDimension} />
        </>
    );
};

export default WithSortControls;
