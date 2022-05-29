import queryString from 'query-string';
import React from 'react';
import './App.css';
import useGuildProfile from './data/guild-profile/use-guild-profile';
import RosterByRoster from './roster-by-roster/RosterByRoster';

const App: React.FC = () => {
  const { guild: guildQuery } = queryString.parse(window.location.search);
  const guild2Id = (Array.isArray(guildQuery) ? guildQuery.filter(g => g !== null)[0] : guildQuery) ?? '';
  const guild1 = useGuildProfile();
  const guild2 = useGuildProfile(guild2Id);

  return (
    <div className="App">
      <RosterByRoster guild1={guild1} guild2={guild2}/>
    </div>
  );
}

export default App;
