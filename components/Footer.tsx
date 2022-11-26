import Link from "next/link";
import style from "../styles/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <ul>
        <li>
          <Link href={`/photos`}>フォトライブラリ {`＞`}</Link>
        </li>
        <li>
          <Link href={`/blogs`}>ブログ {`＞`}</Link>
        </li>
      </ul>
    </footer>
  );
}
