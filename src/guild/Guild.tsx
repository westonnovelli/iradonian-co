import React from 'react';
import './Guild.css';
import { GuildProfile } from '../../app/tw/guild-profile.types';
import Member from '../../app/tw/member/Member';

interface Props {
  guild: GuildProfile;
  rtl?: boolean;
}

const Guild: React.FC<Props> = ({ guild, rtl = false }) => {
    return (
        <div className="guild">
          <h1>{guild.name}</h1>
          {guild.banner_logo_id && <img src={`https://swgoh.gg/static/img/assets/tex.${guild.banner_logo_id}.png`} />}
          <div>{guild.galactic_power?.toLocaleString('en-us')}</div>
          <div>{guild.avg_skill_rating}</div>
          <div>{guild.member_count} of 50</div>
          <div className="guild-members">
            {guild.members?.sort((a, b) => (
              b.galactic_power - a.galactic_power
            )).map((member) => (
              <Member key={member.ally_code} member={member} rtl={rtl}/>
            ))}
          </div>
        </div>
    );
};

export default Guild;
