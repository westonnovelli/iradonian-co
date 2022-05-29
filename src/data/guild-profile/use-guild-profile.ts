import type { GuildProfile } from './guild-profile.types';

import React from 'react';

const baseUrl = process.env.REACT_APP_API_SERVER?.trim();

const useGuildProfile = (guildId?: string): GuildProfile => {
    const [data, setData] = React.useState<any>({}); 
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${baseUrl}/swgoh/guild_profile/${guildId ?? ''}`);
            const json = await response.json();
            setData(json?.data as GuildProfile);
        }

        fetchData();
    }, [guildId]);

    return data;
};

export default useGuildProfile;
