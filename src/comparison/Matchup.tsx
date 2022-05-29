import type { Member } from "../data/guild-profile/guild-profile.types";

import React from "react";
import "./Matchup.css";

interface Props {
    a: Member;
    b: Member;
    compareTo?: (a: Member, b: Member) => [boolean, boolean, boolean];
}

const defaultCompare = (a: Member, b: Member) => {
    return [
        a.galactic_power > b.galactic_power,
        a.galactic_power < b.galactic_power,
        a.galactic_power === b.galactic_power,
    ];
}

const Matchup: React.FC<Props> = ({a, b, compareTo = defaultCompare}) => {
    const [aWins, bWins, tie] = compareTo(a, b);
    return (
        <div className="matchup">
            <div className={`${aWins ? 'leftWins' : ''}${bWins ? 'rightWins' : ''}${tie ? 'tie' : ''}`} />
            <hr/>
        </div>
    );
};

export default Matchup;
