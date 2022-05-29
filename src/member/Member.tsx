import React from 'react';
import type { Member as MemberType } from '../data/guild-profile/guild-profile.types';
import './Member.css';

interface Props {
    member: MemberType;
    rtl?: boolean;
}

const Member: React.FC<Props> = ({member, rtl = false}) => {
    return (
        <div className={`member ${rtl ? 'right' : 'left'} ${member.member_level > 2 ? 'officer' : ''}`}>
            <div className="picture">
                <img className="portrait" src={member.portrait_image} />
                <img className="outline" src={member.league_frame_image} />
            </div>
            <div className="id" style={{ textAlign: rtl ? 'right' : 'left' }}>
                <span className="name">{member.player_name}</span>
                <span className="title">{member.title}</span>
            </div>
            <span className="gp">{member.galactic_power.toLocaleString('en-us')}</span>
            <span className="league">{member.league_name && member.league_name}</span>
        </div>
    );
};

export default Member;
