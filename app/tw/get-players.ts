import mock from "../../mockapi";
import { Player_short } from "./mocks_short";
import { Datacron, Mod, Player, Root, SecondaryStat, Unit } from "./player.types";

const parseUnit = (unit: any): Unit => {
    const data = unit.data ?? {};
    return {
        base_id: data.base_id,
        name: data.name,
        gear_level: data.gear_level,
        level: data.level,
        power: data.power,
        rarity: data.rarity,
        url: data.url,
        zeta_abilities: data.zeta_abilities,
        omicron_abilities: data.omicron_abilities,
        relic_tier: data.relic_tier,
        has_ultimate: data.has_ultimate,
        is_galactic_legend: data.is_galactic_legend,
    };
};

const parseSecondaryStat = (stat: any): SecondaryStat => {
    return {
        name: stat.name,
        stat_id: stat.stat_id,
        value: stat.value,
        display_value: stat.display_value,
        roll: stat.roll,
    };
};

const parseMod = (mod: any): Mod => {
    return {
        id: mod.id,
        level: mod.level,
        tier: mod.tier,
        rarity: mod.rarity,
        set: mod.set,
        slot: mod.slot,
        primary_stat: {
            name: mod.primary_stat?.name,
            stat_id: mod.primary_stat?.stat_id,
            value: mod.primary_stat?.value,
            display_value: mod.primary_stat?.display_value,
        },
        character: mod.character,
        secondary_stats: mod.secondary_stats.map(parseSecondaryStat),
    };
};

const parseDatacron = (datacron: any): Datacron => {
    return {
        id: datacron.id,
        tier: datacron.tier,
    }
};

export type ParsedPlayer = Player & {
    units: Root['units'],
    mods: Root['mods'],
    datacrons: Root['datacrons']
};

const parsePlayer = (player: any): ParsedPlayer => {
    const { data, units, mods, datacrons } = player ?? {};
    return {
        ally_code: data.ally_code,
        arena_leader_base_id: data.arena_leader_base_id,
        arena_rank: data.arena_rank,
        level: data.level,
        name: data.name,
        galactic_power: data.galactic_power,
        character_galactic_power: data.character_galactic_power,
        ship_galactic_power: data.ship_galactic_power,
        skill_rating: data.skill_rating,
        division_number: data.division_number,
        league_name: data.league_name,
        last_updated: data.last_updated,
        url: data.url,
        units: units.map(parseUnit),
        mods: mods.map(parseMod),
        datacrons: datacrons.map(parseDatacron),
    };
}

export const fetchPlayerByAllyCode = async (allyCode: string): Promise<ParsedPlayer> => {
    if (!mock) {
        const response = await fetch(`https://swgoh.gg/api/player/${allyCode}`);
        try {
            const json = await response.json() ?? {};
            return parsePlayer(json);
        } catch (e) {
            console.error({allyCode, e});
        }
    }
    return Promise.resolve(parsePlayer(Player_short));
}

const getPlayers = async (playerList: string[]): Promise<ParsedPlayer[]> => {
    const responses = await Promise.all(playerList.map(fetchPlayerByAllyCode));
    return responses;
}

export default getPlayers;
