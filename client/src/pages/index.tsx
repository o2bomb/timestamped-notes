import Link from "next/link";
import Layout from "../components/Layout/Layout";
import { useGetLecturesQuery } from "../generated/graphql";

export default function Home() {
  const { data } = useGetLecturesQuery();

  return (
    <Layout>
      {
        data?.lectures.map((lecture, index) => (
          <Link key={index} href={`/lecture/${lecture.id}`}>
            {lecture.videoUrl}
          </Link>
        ))
      }
    </Layout>
  )
}
