import React from 'react';

import GuildSummary from './guild/GuildSummary';
import './tw-responsive.css';
import './tw.css';
import LowerSection from './LowerSection';

const TW = () => {
    return (
        <div className="tw">
            <div className="summary">
                {/* @ts-expect-error Server Component */}
                <GuildSummary fallback />
                {/* @ts-expect-error Server Component */}
                <GuildSummary />
            </div>
            <LowerSection />
        </div>
    );
};

export default TW;
