import mock from '../../mockapi';
import type { GuildProfile } from './guild-profile.types';
import { guildProfile_short } from './mocks_short';

const DEFAULT_GUILD = process.env.GUILD_ID ?? '6kigC5URTk6Sih8sHfs0nQ';

function getGuildId(text: string | undefined = ''): string | null {
    if (!text.includes('swgoh.gg')) return null;

    const match = text.match(/swgoh.gg\/g\//);
    if (match && match.index) {
        const endsWithSlash = text.endsWith('/');
        return text.slice(match.index + (match[0]?.length ?? 0), endsWithSlash ? -1 : undefined);
    }
    return null;
}

async function getLastCommentsGuildId() {
    const ghResponse = await fetch('https://api.github.com/repos/westonnovelli/iradonian-co/issues/1/comments');
    const commentList = await ghResponse.json();

    const lastComment = commentList[commentList.length -1 ];
    const author = lastComment?.user?.id;
    if (author.toString() !== process.env.AUTHORIZED_REVALIDATOR) return DEFAULT_GUILD;

    return getGuildId(lastComment?.body) ?? DEFAULT_GUILD;
}

async function getGuildProfile(guild: string | undefined): Promise<GuildProfile> {
    if (!mock) {
        const guildId = guild ? await getLastCommentsGuildId() : DEFAULT_GUILD;
        const response = await fetch(`https://swgoh.gg/api/guild-profile/${guildId}/`, { next: { revalidate: 60 * 60 * 24 }});
        const json = await response.json();
        return json.data;
    } else {
        return guildProfile_short.data;
    }
}

export default getGuildProfile;
