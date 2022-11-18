import React from 'react';
import WithSortControls from './comparison/WithSortControls';
import getGuildProfile from './get-guild-profile';
import PlayerDetails from './player/PlayerDetails';

const PlayerMatchup = async ({ guildId }: { guildId: string }) => {
    const guild1 = await getGuildProfile();
    const guild2 = await getGuildProfile(guildId);

    return (
        <WithSortControls guild1={guild1} guild2={guild2} >
            {guild1.members.concat(guild2.members).map((player) => {
                if (!player?.ally_code) return;
                return (
                    <React.Suspense fallback={null} key={player.ally_code}>
                        {/* @ts-expect-error Server Component */}
                        <PlayerDetails key={player.ally_code} allyCode={`${player.ally_code}`} />
                    </React.Suspense>
                );
            })}
        </WithSortControls>
    );
};

export default PlayerMatchup;
