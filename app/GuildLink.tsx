'use client';
import React from 'react';
import './GuildLink.css'

function getGuildId(text: string): string | null {
    if (!text.includes('swgoh.gg')) return null;

    const match = text.match(/swgoh.gg\/g\//);
    if (match && match.index) {
        console.log(match);
        const endsWithSlash = text.endsWith('/');
        return text.slice(match.index + match[0].length, endsWithSlash ? -1 : undefined);
    }
    return null;
}

interface Props {
    className: string;
}

const GuildLink: React.FC<Props> = (props) => {
    const [text, setText] = React.useState('');

    const guildId = getGuildId(text.trim());
    return (
        <a href={Boolean(guildId) ? `/tw?guild=${guildId}`: '#'} {...props} onClick={Boolean(guildId) ? () => {} : (e) => {e.preventDefault()}}>
            <h2>Territory War &rarr;</h2>
            <p>Enter a guild url from swgoh.gg</p>
            <input
                className="guild"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onChange={(e) => setText(e.target.value)}
                value={text}
                placeholder="paste a swgoh.gg guild url"
            />
        </a>
    )
};

export default GuildLink;
