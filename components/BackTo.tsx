import Link from "next/link";
import styles from "../styles/BackTo.module.scss";

export default function BackTo({ to, text }: { to: string; text: string }) {
  return (
    <Link className={`mt-10 inline-block ${styles.back}`} href={`${to}`}>
      ← {text}へ戻る
    </Link>
  );
}
