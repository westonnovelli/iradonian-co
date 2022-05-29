import queryString from 'query-string';
import React from 'react';
import './App.css';
import Calculating from './calculating/Calculating';
import useGuildProfile from './data/guild-profile/use-guild-profile';
import RosterByRoster from './roster-by-roster/RosterByRoster';

const App: React.FC = () => {
  const { guild: guildQuery } = queryString.parse(window.location.search);
  const guild2Id = (Array.isArray(guildQuery) ? guildQuery.filter(g => g !== null)[0] : guildQuery) ?? '';
  const guild1 = useGuildProfile();
  const guild2 = useGuildProfile(guild2Id);

  const ready = Object.entries(guild1).length > 0 || Object.entries(guild2).length > 0;
  return (
    <div className="App">
      {ready && <RosterByRoster guild1={guild1} guild2={guild2}/>}
      {!ready && <Calculating />}
    </div>
  );
}

export default App;
