import Link from "next/link";
import Layout from "../components/Layout/Layout";
import VideoCard from "../components/VideoCard";
import { Lecture, useGetLecturesQuery } from "../generated/graphql";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { data } = useGetLecturesQuery();

  return (
    <Layout variant="large">
      <div className={styles.container}>
        {data?.lectures.map((lecture, index) => (
          <VideoCard key={index} {...(lecture as Lecture)} />
        ))}
        <div className={styles.empty}></div>
      </div>
    </Layout>
  );
}
