import { robotoMono } from "./fonts";
import styles from "./page.module.css";

const version = "1.0 beta";

export default function Home() {
  return (
    <div className={styles.landing}>
      <div className={`${styles.version} ${robotoMono.className}`}>
        <b>Virtual Wallet 3</b>
        <span>{version}</span>
        <br />
      </div>
      <div>
        Full-stack application written in TypeScript.
        <br />
        All of the data visible on the page is automatically scraped.
        <br />
        For price updates scraper runs everyday after the market closes.
        <br />
        <br />
        <ul className={styles.techList}>
          <b>Server:</b>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>Puppeteer.js</li>
          <br />
          <b>Database:</b>
          <li>MySQL</li>
          <li>Prisma</li>
          <br />
          <b>Frontend:</b>
          <ul>
            <ul>
              <li>React with Next.js</li>
              <li>Radix-ui with css.modules</li>
              <li>Axios with React Query</li>
              <li>Zustand</li>
              <li>Lightweight Charts</li>
            </ul>
          </ul>
        </ul>
      </div>
    </div>
  );
}
