import type { Root, Player, Unit, UnitBlob } from '../../../app/tw/player.types';

import React from 'react';

const baseUrl = process.env.REACT_APP_API_SERVER?.trim();

interface Result {
    players: Root[]
    loading: boolean;
}

const usePlayers = (playerList: string[]): Result => {
    const [players, setPlayers] = React.useState<Root[]>([]);
    const [loading, setLoading] = React.useState(false);

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
            setLoading(false);
            setPlayers(json as Root[]);
        }

        if (playerList.length > 0) {
            setLoading(true);
            fetchData();
        }
    }, [playerList]);

    return {
        players,
        loading,
    };
};

export default usePlayers;