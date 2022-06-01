import type { Root, Player, Unit, UnitBlob } from './player.types';

import React from 'react';

const baseUrl = process.env.REACT_APP_API_SERVER?.trim();

interface Result {
    players: Root[]
}

const usePlayers = (playerList: string[]): Result => {
    const [players, setPlayers] = React.useState<Root[]>([]);
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${baseUrl}/swgoh/players/units`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ players: playerList }),
            });
            const json = await response.json();
            setPlayers(json as Root[]);
        }

        fetchData();
    }, []);

    return {
        players
    };
};

export default usePlayers;