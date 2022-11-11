import React from 'react';

import GuildSummary from './guild/GuildSummary';
import PlayerMatchup from './PlayerMatchup';
import './tw-responsive.css';
import './tw.css';

const TW = ({ searchParams }: { searchParams: { guild: string } }) => {
    const guildId = searchParams?.guild;

    return (
        <div className="tw">
            <div className="summary">
                {/* @ts-expect-error Server Component */}
                <GuildSummary />
                {/* @ts-expect-error Server Component */}
                <GuildSummary guildId={guildId}/>
            </div>
            {/* @ts-expect-error Server Component */}
            <PlayerMatchup guildId={guildId}/>
        </div>
    );
};

export default TW;
