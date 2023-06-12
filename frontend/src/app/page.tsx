import { robotoMono } from "./fonts";
import styles from "./page.module.css";

const version = "1.0 beta";

export default function Home() {
  return (
    <div className={styles.landing}>
      <div className={`${styles.version} ${robotoMono.className}`}>
        <h1>Virtual Wallet 3</h1>
        <span>{version}</span>
      </div>
      <div className={styles.appDescription}>
        <p>Full-stack application written in TypeScript.</p>
        <p>All of the data visible on the page is automatically scraped.</p>
        <p>
          For price updates scraper runs on weekdays after the market closes.
        </p>
        <p>User data is stored in the browser.</p>
      </div>
      <div className={styles.techList}>
        <b>Server:</b>
        <ul>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>Puppeteer.js</li>
        </ul>
        <b>Database:</b>
        <ul>
          <li>MySQL</li>
          <li>Prisma</li>
        </ul>
        <b>Frontend:</b>
        <ul>
          <li>React with Next.js</li>
          <li>Radix-ui with css.modules</li>
          <li>Axios with React Query</li>
          <li>Zustand</li>
          <li>Lightweight Charts</li>
        </ul>
      </div>
    </div>
  );
}
