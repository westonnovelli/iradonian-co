import type { GuildProfile, Member } from "../data/guild-profile/guild-profile.types";

import React from "react";

import './Comparison.css';
import Guild from "../guild/Guild";
import Matchup from "./Matchup";

interface Props {
    guild1: GuildProfile;
    guild2: GuildProfile;
}


const Comparison: React.FC<Props> = ({guild1, guild2}) => {
    const g1Members = guild1?.members?.sort((a, b) => b.galactic_power - a.galactic_power) ?? [];
    const g2Members = guild2?.members?.sort((a, b) => b.galactic_power - a.galactic_power) ?? [];
    
    const pairs = g1Members.map((member, i) => ([member, g2Members[i]]));

    return (
        <div className="comparison layout">
            <Guild guild={guild1}/>
            <div className="comparator">
                {pairs.map(([g1, g2], i) => (
                    <Matchup key={i} a={g1} b={g2} />
                ))}
            </div>
            <Guild guild={guild2} rtl/>
        </div>
    );
};

export default Comparison;
