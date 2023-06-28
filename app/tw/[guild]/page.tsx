import React from "react";

import GuildSummary from "../guild/GuildSummary";
import PlayerMatchup from "./PlayerMatchup";
import SortControls from "../sort/SortControls";

const InvalidTW: React.FC = () => {
  return (
    <div className="invalid">
      <div>
        Couldn&apos;t track down that matchup, try the{" "}
        <a href="/tw/current">current</a> one.
      </div>
    </div>
  );
};

const Page = ({ params }: { params: { guild: string } }) => {
  const guild = params?.guild;

  if (guild !== "current") return <InvalidTW />;

  return (
    <>
      <div className="summary">
        {/* @ts-expect-error Server Component */}
        <GuildSummary />
        {/* @ts-expect-error Server Component */}
        <GuildSummary guildId={guild} />
      </div>
      <SortControls />
      {/* @ts-expect-error Server Component */}
      <PlayerMatchup guildId={guild} />
    </>
  );
};

export async function generateStaticParams() {
  return [{ guild: "current" }];
}

export default Page;
