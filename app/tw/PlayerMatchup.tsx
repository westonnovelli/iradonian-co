import React from 'react';
import WithSortControls from './comparison/WithSortControls';
import getGuildProfile from './get-guild-profile';

const PlayerMatchup = async ({ guildId }: { guildId: string }) => {
    const guild1 = await getGuildProfile();
    const guild2 = await getGuildProfile(guildId);

    return (
        <WithSortControls guild1={guild1} guild2={guild2} />
    );
};

export default PlayerMatchup;
