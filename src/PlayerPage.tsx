import React from 'react';
import usePlayer from './data/player/use-player';
import Player from './player/Player';

const PlayerPage: React.FC = () => {
    const { data: player, units } = usePlayer();

    return (
        <Player player={player} units={units} />
    );
};

export default PlayerPage;
