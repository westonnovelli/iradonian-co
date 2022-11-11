import ContentLoader from 'react-content-loader';
import getPlayers, { type ParsedPlayer } from "../get-players";
import { GuildProfile } from "../guild-profile.types";

const getAggregations = (players: ParsedPlayer[]) => players.reduce((acc, { units = [] }) => {
    if (units.length === 0) acc.missingAny = true;
    acc.glCount += units.filter(unit => unit.is_galactic_legend).length;
    acc.ultimateCount += units.filter(unit => unit.has_ultimate).length;
    return acc;
}, {
    glCount: 0,
    ultimateCount: 0,
    missingAny: false,
});

const GuildAggregate = async ({ guild }: { guild: GuildProfile }) => {
    const allyCodes = (guild?.members ?? [])
        .map((member) => member?.ally_code?.toString() ?? '')
        .filter(x => x !== '');
    const players = await getPlayers(allyCodes);
    const { glCount, ultimateCount, missingAny } = getAggregations(players);
    return (
        <div>
            <label title={missingAny ? 'Some rosters were not counted, could be more' : ''}>
                GL Count{missingAny ? '*' : ''}
            </label>
            {' '}{glCount}{' '}
            <label>(Ults)</label>
            {' '}{ultimateCount}
        </div>
    );
};

export const Loader = () => {
    return (
        <ContentLoader
            height={16}
            width="80%"
            speed={1}
            backgroundColor="#a1a5a5"
            foregroundColor="#dde3e5"
        >
            <rect x={0} y={0} width="100%" height={16} rx={8} ry={8}/>
        </ContentLoader>
    );
};

export default GuildAggregate;
