import { Member } from "../guild-profile.types";

const LEAGUES: Record<string, number> = {
    KYBER: 10,
    AURODIUM: 9,
    BRONZIUM: 8,
    CHROMIUM: 7,
    CARBONITE: 6,
    none: 0,
};

type SortingFn = (a: Member, b: Member) => number;
type CompareFn = (a: Member, b: Member) => [boolean, boolean, boolean];

export const SORTS: Record<string, {
    sort: SortingFn,
    compare: CompareFn
}> = {
    GP: {
        sort: (a: Member, b: Member) => b.galactic_power - a.galactic_power,
        compare: (a: Member, b: Member) => [
            a.galactic_power > b.galactic_power,
            a.galactic_power < b.galactic_power,
            a.galactic_power === b.galactic_power,
        ]
    },
    L: {
        sort: (a: Member, b: Member) => {
            const aLeague = LEAGUES[a.league_id || 'none'];
            const bLeague = LEAGUES[b.league_id || 'none'];
            if (aLeague === bLeague) {
                return SORTS.GP.sort(b, a);
            }
            return bLeague - aLeague;
        },
        compare: (a: Member, b: Member) => [
            LEAGUES[a.league_id || 'none'] > LEAGUES[b.league_id || 'none'],
            LEAGUES[a.league_id || 'none'] < LEAGUES[b.league_id || 'none'],
            LEAGUES[a.league_id || 'none'] === LEAGUES[b.league_id || 'none'],
        ]
    }
};
