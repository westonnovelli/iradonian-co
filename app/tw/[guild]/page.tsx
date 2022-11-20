import React from 'react';

import GuildSummary from '../guild/GuildSummary';
import PlayerMatchup from './PlayerMatchup';
import SortControls from '../sort/SortControls';

const Page = ({ params }: { params: { guild: string } }) => {
    const guildId = params?.guild;

    return (
        <>
            <div className="summary">
                {/* @ts-expect-error Server Component */}
                <GuildSummary />
                {/* @ts-expect-error Server Component */}
                <GuildSummary guildId={guildId} />
            </div>
            <SortControls />
            {/* @ts-expect-error Server Component */}
            <PlayerMatchup guildId={guildId} />
        </>
    );
};

export default Page;
