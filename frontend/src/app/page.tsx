import { robotoMono } from "./fonts";
import styles from "./page.module.css";

const version = "1.0 beta";
const description = (
  <>
    <p>Full-stack application written in TypeScript.</p>
    <p>All of the data visible on the page is automatically scraped.</p>
    <p>For price updates scraper runs on weekdays after the market closes.</p>
    <p>User data is stored in the browser.</p>
  </>
);

export default function Home() {
  return (
    <div className={styles.landing}>
      <div className={`${styles.version} ${robotoMono.className}`}>
        <h1>Virtual Wallet 3</h1>
        <span>{version}</span>
      </div>
      <div>{description}</div>
      <div>
        <div className={styles.techList}>
          <div>
            <b>Server:</b>
            <br />
            Node.js | Express.js | Puppetteer.
          </div>
          <div>
            <b>Database:</b>
            <br />
            Prisma | MySQL
          </div>
          <div>
            <b>Frontend:</b>
            <br />
            React with Next.js | Radix-Ui with CSS.modules | Axios with React
            Query | Zustand
          </div>
        </div>
      </div>
    </div>
  );
}
