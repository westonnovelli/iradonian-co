export interface Root {
    data: Player;
    units: UnitBlob[];
    mods: Mod[];
}

export interface Player {
    ally_code: number;
    arena_leader_base_id: string;
    arena_rank: number;
    level: number;
    name: string;
    last_updated: string;
    galactic_power: number;
    character_galactic_power: number;
    ship_galactic_power: number;
    ship_battles_won: number;
    pvp_battles_won: number;
    pve_battles_won: number;
    pve_hard_won: number;
    galactic_war_won: number;
    guild_raid_won: number;
    guild_contribution: number;
    guild_exchange_donations: number;
    season_full_clears: number;
    season_successful_defends: number;
    season_league_score: number;
    season_undersized_squad_wins: number;
    season_promotions_earned: number;
    season_banners_earned: number;
    season_offensive_battles_won: number;
    season_territories_defeated: number;
    url: string;
    arena: SquadArena;
    fleet_arena: FleetArena;
    skill_rating: number;
    division_number: string;
    league_name: string;
    league_frame_image: string;
    league_blank_image: string;
    league_image: string;
    division_image: string;
    portrait_image: string;
    title: string;
    guild_id: string;
    guild_name: string;
    guild_url: string;
    mods: any[];
}

export interface SquadArena {
    rank: number;
    leader: string;
    members: string[];
}

export interface FleetArena {
    rank: number;
    leader: string;
    members: string[];
    reinforcements: string[];
}

export interface UnitBlob {
    data: Unit;
}

export interface Unit {
    base_id: string;
    name: string;
    gear_level: number;
    level: number;
    power: number;
    rarity: number;
    gear: Gear[]; // current gear level's 6 slots
    url: string;
    stats: Stats; // what is this
    stat_diffs: StatDiffs; // and this
    zeta_abilities: string[];
    omicron_abilities: string[];
    ability_data: Ability[];
    mod_set_ids: number[];
    combat_type: number;
    relic_tier: number;
    has_ultimate: boolean;
    is_galactic_legend: boolean;
}

export interface Gear {
    slot: number;
    is_obtained: boolean;
    base_id: string;
}

export interface Stats {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
    "7": number;
    "8": number;
    "9": number;
    "10": number;
    "11": number;
    "12": number;
    "13": number;
    "14": number;
    "15": number;
    "16": number;
    "17": number;
    "18": number;
    "27": number;
    "28": number;
    "37": number;
    "39": number;
    "38": number;
    "40": number;
}

export interface StatDiffs {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
    "7": number;
    "8": number;
    "9": number;
    "10": number;
    "11": number;
    "12": number;
    "13": number;
    "14": number;
    "15": number;
    "16": number;
    "17": number;
    "18": number;
    "27": number;
    "28": number;
    "37": number;
    "39": number;
    "38": number;
    "40": number;
}

export interface Ability {
    id: string;
    ability_tier: number;
    is_omega: boolean;
    is_zeta: boolean;
    is_omicron: boolean;
    has_omicron_learned: boolean;
    has_zeta_learned: boolean;
    name: string;
    tier_max: number;
}

export interface Mod {
    id: string;
    level: number;
    tier: number;
    rarity: number;
    set: number;
    slot: number;
    primary_stat: PrimaryStat;
    character: string;
    secondary_stats: SecondaryStat[];
}

export interface PrimaryStat {
    name: string;
    stat_id: number;
    value: number;
    display_value: string;
}

export interface SecondaryStat {
    name: string;
    stat_id: number;
    value: number;
    display_value: string;
    roll: number;
}
