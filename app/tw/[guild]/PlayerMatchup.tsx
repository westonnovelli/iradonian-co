import React from 'react';
import getGuildProfile from '../get-guild-profile';
import PlayerDetails from '../player/PlayerDetails';
import MatchupList from '../comparison/MatchupList';

const PlayerMatchup = async ({ guildId }: { guildId: string }) => {
    const guild1 = await getGuildProfile();
    const guild2 = await getGuildProfile(guildId);

    return (
        <MatchupList guild1={guild1} guild2={guild2}>
            {guild1.members.concat(guild2.members).map((player) => {
                if (!player?.ally_code) return;
                return (
                    <React.Suspense fallback={null} key={player.ally_code}>
                        {/* @ts-expect-error Server Component */}
                        <PlayerDetails key={player.ally_code} allyCode={`${player.ally_code}`} />
                    </React.Suspense>
                );
            })}
        </MatchupList>
    );
};

export default PlayerMatchup;
