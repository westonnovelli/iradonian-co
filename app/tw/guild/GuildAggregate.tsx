import ContentLoader from 'react-content-loader';
import getPlayers, { type ParsedPlayer } from "../get-players";
import { GuildProfile } from "../guild-profile.types";
import { getTWOmicronCount } from '../omicrons';

const getAggregations = (players: ParsedPlayer[]) => players.reduce((acc, player) => {
    if (player.units.length === 0) acc.missingAny = true;
    acc.glCount += player.units.filter(unit => unit.is_galactic_legend).length;
    acc.ultimateCount += player.units.filter(unit => unit.has_ultimate).length;
    acc.twOmiCount += getTWOmicronCount(player);
    acc.datacronCount += player.datacrons.filter(({ tier }) => tier >= 1).length;
    return acc;
}, {
    glCount: 0,
    ultimateCount: 0,
    missingAny: false,
    twOmiCount: 0,
    datacronCount: 0,
});

const GuildAggregate = async ({ guild }: { guild: GuildProfile }) => {
    const allyCodes = (guild?.members ?? [])
        .map((member) => member?.ally_code?.toString() ?? '')
        .filter(x => x !== '');
    const players = await getPlayers(allyCodes);
    const { glCount, ultimateCount, missingAny, twOmiCount, datacronCount } = getAggregations(players);
    return (
        <>
            <div>
                <label title={missingAny ? 'Some rosters were not counted, could be more' : ''}>
                    GLs{missingAny ? '*' : ''}
                </label>
                {' '}{glCount}{' '}
                <label>(Ults)</label>
                {' '}{ultimateCount}
            </div>
            <div>
                <label>TW Omicrons</label>
                {' '}{twOmiCount}{' '}
            </div>
            <div>
                <label>Datacrons</label>
                {' '}{datacronCount}{' '}
            </div>
        </>
    );
};

export const Loader = () => {
    return (
        <>
            <ContentLoader
                height={52}
                speed={1}
                backgroundColor="#a1a5a5"
                foregroundColor="#dde3e5"
            >
                <rect x={40} y={0} width="80%" height={16} rx={8} ry={8} />
                <rect x={68} y={18} width="60%" height={16} rx={8} ry={8} />
                <rect x={95} y={36} width="40%" height={16} rx={8} ry={8} />
            </ContentLoader>
        </>
    );
};

export default GuildAggregate;
