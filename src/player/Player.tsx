import React from "react";
import type { Player as PlayerType, Unit } from '../../app/tw/player.types';
import './Player.css';

interface Props {
    player: PlayerType | undefined;
    units: Unit[];
}

const getGLs = (units: Unit[] = []) => {
    const gls = units.filter(({ is_galactic_legend }) => is_galactic_legend);
    return gls.map((unit) => ({
        base_id: unit.base_id,
        name: unit.name,
        level: unit.level,
        rarity: unit.rarity,
        gear_level: unit.gear_level,
        relic_tier: unit.relic_tier,
        has_ulitmate: unit.has_ultimate,
    }));
}

const Player: React.FC<Props> = ({ player, units }) => {
    const gls = getGLs(units);

    return (
        <div className="player">
            <div className="name">{player?.name}</div>
            <div className="skill">{player?.skill_rating}</div>
            <div className="gls">
                {gls.map((gl) => (
                    <div key={gl.base_id} className="gl-unit">
                        {gl.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Player;
