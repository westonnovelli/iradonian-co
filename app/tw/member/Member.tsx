'use client';

import React from 'react';
import readable from '../number';
import type { Member as MemberType } from '../guild-profile.types';
import './Member.css';
import './Responsive.css';
import PlayerDetails from '../player/PlayerDetails';

interface Props {
    member: MemberType;
    rtl?: boolean;
    children?: React.ReactNode;
}

const Member: React.FC<Props> = ({ member, rtl = false, children }) => {
    const gp = member.galactic_power.toLocaleString('en-us');
    const shortGp = readable(`${member.galactic_power}`, 2);

    const [expanded, setExpanded] = React.useState(false);

    return (
        <div
            role="button"
            onClick={() => setExpanded(prev => !prev)}
        >
            <div
                className={`member ${rtl ? 'right' : 'left'} ${member.member_level > 2 ? 'officer' : ''} ${member.league_name ? `league-${member.league_name}` : ''}`}
            >
                <div className="picture">
                    <img className="portrait" src={member.portrait_image} />
                    <img className="outline" src={member.league_frame_image} />
                </div>
                <div className="id" style={{ textAlign: rtl ? 'right' : 'left' }}>
                    <span className="name">{member.player_name}</span>
                    <span className="title">{member.title}</span>
                </div>
                <span className="gp-long">{gp}</span>
                <span className="gp-short" title={gp}>{shortGp}</span>
            </div>
            {children}
        </div>
    );
};

export default Member;
