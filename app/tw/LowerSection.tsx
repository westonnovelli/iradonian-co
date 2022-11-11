'use client';

import React from 'react';
import MatchupList from './comparison/MatchupList';

const LowerSection = () => {
    const [sortingDimension, setSortingDimension] = React.useState('GP');

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
            <React.Suspense fallback={null}>
                {/* @ts-expect-error Server Component */}
                {/* <MatchupList sortingDimension={sortingDimension} /> */}
            </React.Suspense>
        </>
    );
};

export default LowerSection;
