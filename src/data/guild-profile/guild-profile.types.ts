export interface Root {
    data: GuildProfile;
    message: string | null;
}

export interface GuildProfile {
    guild_id: string;
    name: string;
    external_message?: string;
    banner_color_id: string;
    banner_logo_id: string;
    enrollment_status?: number;
    galactic_power: number;
    guild_type?: string;
    level_requirement?: number;
    member_count: number;
    members: Member[];
    avg_galactic_power?: number;
    avg_arena_rank?: number;
    avg_fleet_arena_rank?: number;
    avg_skill_rating?: number;
    last_sync?: string;
}

export interface Member {
    galactic_power: number;
    guild_join_time: string;
    lifetime_season_score: number;
    member_level: number;
    ally_code?: number;
    player_level: number;
    player_name: string;
    league_id: string;
    league_name?: string;
    league_frame_image?: string;
    portrait_image: string;
    title: string;
    squad_power: number;
}
