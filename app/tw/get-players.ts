import { Player_short } from "./mocks_short";
import { Player, Root, Unit } from "./player.types";

const mock = true;

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
}

export type ParsedPlayer = Player & { units: Root['units'] };

const parsePlayer = (player: any): ParsedPlayer => {
    const { data, units } = player ?? {};
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
        units: units.map(parseUnit)
    };
}

export const fetchPlayerByAllyCode = async (allyCode: string): Promise<ParsedPlayer> => {
    if (!mock) {
        const response = await fetch(`https://swgoh.gg/api/player/${allyCode}`);
        try {
            const json = await response.json() ?? {};
            return parsePlayer(json);
        } catch (e) {
            console.error(e);
        }
    }
    return Promise.resolve(parsePlayer(Player_short));
}

const getPlayers = async (playerList: string[]): Promise<ParsedPlayer[]> => {
    const responses = await Promise.all(playerList.map(fetchPlayerByAllyCode));
    return responses;
}

export default getPlayers;
