import type { Player, Unit, UnitBlob } from '../../../app/tw/player.types';

import React from 'react';

interface Result {
    data: Player | undefined;
    units: Unit[];
}

const usePlayer = (): Result => {
    const [data, setData] = React.useState<Player | undefined>();
    const [units, setUnits] = React.useState<Unit[]>([]);
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/player');
            const json = await response.json();
            setData(json?.data as Player);
            setUnits((json?.units as UnitBlob[]).map(({data})=> data));
        }

        fetchData();
    }, []);

    return {
        data,
        units,
    };
};

export default usePlayer;