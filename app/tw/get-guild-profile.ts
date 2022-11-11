import type { GuildProfile } from './guild-profile.types';
import { guildProfile_short } from './mocks_short';
const DEFAULT_GUILD = '6kigC5URTk6Sih8sHfs0nQ';
const mock = false;

async function getGuildProfile(guildId = DEFAULT_GUILD): Promise<GuildProfile> {
    if (!mock) {
        const response = await fetch(`https://swgoh.gg/api/guild-profile/${guildId}/`);
        const json = await response.json();
        return json.data;
    } else {
        return guildProfile_short.data;
    }
}

export default getGuildProfile;
