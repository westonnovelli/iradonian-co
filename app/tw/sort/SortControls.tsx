'use client';

import React from 'react';
import { useSort } from './SortContext';

const SortControls = () => {
    const { setSortingDimension } = useSort();

    return (
        <div className="matchup-dimension">
            Sort rosters by:
            <select onChange={(e) => {
                setSortingDimension(e.target.value);
            }}>
                <option value="GP">Galactic Power (GP)</option>
                <option value="L">GAC League</option>
            </select>
        </div>
    );
};

export default SortControls;
