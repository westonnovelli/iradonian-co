import type { GuildProfile } from './guild-profile.types';

import React from 'react';

const baseUrl = process.env.REACT_APP_API_SERVER?.trim();

interface Result {
    guild: GuildProfile;
    loading: boolean;
}

const useGuildProfile = (guildId?: string): Result => {
    const [data, setData] = React.useState<any>({}); 
    const [loading, setLoading] = React.useState(false); 
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${baseUrl}/swgoh/guild_profile/${guildId ?? ''}`);
            const json = await response.json();
            setData(json?.data as GuildProfile);
            setLoading(false);
        }
        setLoading(true);
        fetchData();
    }, [guildId]);

    return {
        guild: data,
        loading
    };
};

export default useGuildProfile;
