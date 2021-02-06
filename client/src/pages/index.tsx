import Link from "next/link";
import Layout from "../components/Layout/Layout";
import VideoCard from "../components/VideoCard";
import { Lecture, useGetLecturesQuery, useMeQuery } from "../generated/graphql";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { data: meData } = useMeQuery();
  const { data } = useGetLecturesQuery();

  const lectureData = () => {
    if (!meData?.me) {
      return (
        <div className={styles.info}>
          Please <Link href="/login">sign in</Link> to start creating notes
        </div>
      );
    }

    if (data?.lectures.length === 0) {
      return (
        <div className={styles.info}>
          <Link href="/create-lecture">
            <button>Create your first lecture</button>
          </Link>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        {data?.lectures.map((lecture, index) => (
          <VideoCard key={index} {...(lecture as Lecture)} />
        ))}
        <div className={styles.empty}></div>
      </div>
    );
  };

  return <Layout variant="large">{lectureData()}</Layout>;
}
