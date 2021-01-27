import Head from "next/head";
import { FormEvent, useState } from "react";
import YouTube from "react-youtube";
import {
  useCreateNoteMutation,
  useGetLectureQuery,
} from "../generated/graphql";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [value, setValue] = useState("");
  const [target, setTarget] = useState<any>();

  const { data, loading, error } = useGetLectureQuery({
    variables: {
      id: 1,
    },
  });
  const [createNote] = useCreateNoteMutation();

  const setVideoTime = (timestamp: number) => {
    if (target === undefined || target === null) {
      return;
    }
    target.seekTo(timestamp);
  };

  const handleSubmitNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTimestamp = Math.round(target.getCurrentTime());

    createNote({
      variables: {
        lectureId: 1,
        content: value,
        timestamp: currentTimestamp,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>timestamped-notes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <YouTube
          videoId="kd1u1ZdJz4w"
          onReady={(e) => {
            setTarget(e.target);
            console.log(e.target);
          }}
        />
        <div className={styles.notes}>
          <div>
            {data?.getLecture?.notes.map((note, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={() => {
                      setVideoTime(note.timestamp);
                    }}
                  >
                    {note.timestamp}
                  </button>
                  {note.content}
                </div>
              );
            })}
          </div>
          <form onSubmit={handleSubmitNote}>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              type="text"
              placeholder="Make notes here"
            />
            <button type="submit">Create note</button>
          </form>
        </div>
      </main>
    </div>
  );
}
