import type { GuildProfile } from './guild-profile.types';

import React from 'react';

const useGuildProfile = (guildId?: string): GuildProfile => {
    const [data, setData] = React.useState<any>({}); 
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8000/guild_profile/${guildId ?? ''}`);
            const json = await response.json();
            setData(json?.data as GuildProfile);
        }

        fetchData();
    }, []);

    return data;
};

export default useGuildProfile;