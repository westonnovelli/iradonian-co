import React from 'react';

import GuildSummary from '../guild/GuildSummary';
import PlayerMatchup from './PlayerMatchup';
import SortControls from '../sort/SortControls';

const Page = ({ params }: { params: { guild: string } }) => {
    const guild = params?.guild;

    if (guild !== 'current') return null;

    return (
        <>
            <div className="summary">
                {/* @ts-expect-error Server Component */}
                <GuildSummary />
                {/* @ts-expect-error Server Component */}
                <GuildSummary guildId={guild} />
            </div>
            <SortControls />
            {/* @ts-expect-error Server Component */}
            <PlayerMatchup guildId={guild} />
        </>
    );
};

export async function generateStaticParams() {
    return [
        { guild: 'current' }
    ];
}

export default Page;
