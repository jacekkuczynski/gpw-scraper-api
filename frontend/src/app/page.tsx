import { Inter } from "next/font/google";
// import styles from './page.module.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={inter.className}>
      <h1>Wirtualny portfel</h1>
      <h2>
        Wirtualny portfel spółek akcyjnych notowanych na Giełdzie Papierów
        Wartościowych (GPW)
      </h2>
    </div>
  );
}
