import React from "react";
import getGuildProfile from "../get-guild-profile";
import GuildAggregate, { Loader } from "./GuildAggregate";
import "./GuildSummary.css";

const GuildSummary = async ({ guildId }: { guildId?: string }) => {
  const guild = await getGuildProfile(guildId);

  return (
    <div className="guild-profile">
      <h1 title={guild.name}>{guild.name}</h1>
      {guild.banner_logo_id && (
        /* eslint-disable @next/next/no-img-element */
        <img
          src={`https://swgoh.gg/static/img/assets/tex.${guild.banner_logo_id}.png`}
        />
      )}
      <div>
        <label>Total GP</label> {guild.galactic_power?.toLocaleString("en-us")}
      </div>
      <div>
        <label>Average GAC Skill Rating</label> {guild.avg_skill_rating}
      </div>
      <div>
        <label>Size</label> {guild.member_count} of 50
      </div>
      <React.Suspense fallback={<Loader />}>
        {/* @ts-expect-error Server Component */}
        <GuildAggregate guild={guild} />
      </React.Suspense>
    </div>
  );
};

export default GuildSummary;
