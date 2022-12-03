import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Loading.module.scss";

export default function Loading({ active }: { active: boolean }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return pageLoading ? (
    <div className=''>
      <div className={active ? styles.loadCircle : ""}></div>
      <div className={active ? styles.loadCircle2 : ""}></div>
    </div>
  ) : null;
}
