import React from "react";
import styles from "./page.module.css";

const GUILD_NAME = process.env.GUILD_NAME ?? "Unique";
const GUILD_ID = process.env.GUILD_ID ?? "6kigC5URTk6Sih8sHfs0nQ";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Iradonian Co.</h1>

        <p className={styles.description}>Built for {GUILD_NAME}</p>

        <div className={styles.grid}>
          <a href="/tw/current" className={styles.card}>
            <h2>Territory War &rarr;</h2>
            <p>See the current matchup</p>
          </a>
          <a
            href={`https://swgoh.gg/g/${GUILD_ID}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>SWGOH.GG &rarr;</h2>
            <p>See {GUILD_NAME}&apos;s profile on swgoh.gg</p>
          </a>
        </div>
      </main>
    </div>
  );
}
