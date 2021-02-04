import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import Layout from "../components/Layout";
import { useAddNoteMutation, useGetLectureQuery, useMeLazyQuery, useMeQuery } from "../generated/graphql";

import styles from "../styles/Home.module.css";
import { secondsToTime } from "../utils/secondsToTime";

export default function Home() {
  const [value, setValue] = useState("");
  const [target, setTarget] = useState<any>();
  const scrollElement = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useGetLectureQuery({
    variables: {
      id: 1,
    },
  });
  const [addNote] = useAddNoteMutation();

  useEffect(() => {
    scrollElement.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setVideoTime = (timestamp: number) => {
    if (target === undefined || target === null) {
      return;
    }
    target.seekTo(timestamp);
  };

  const handleSubmitNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTimestamp = Math.round(target.getCurrentTime());

    await addNote({
      variables: {
        id: 1,
        content: value,
        timestamp: currentTimestamp,
      },
    });

    setValue("");
    scrollElement.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <YouTube
          containerClassName={styles.video}
          videoId="kd1u1ZdJz4w"
          onReady={(e) => {
            setTarget(e.target);
            // console.log(e.target);
          }}
        />
        <div className={styles.notesSection}>
          <div className={styles.list}>
            {data?.getLecture?.notes.map((note, index) => {
              return (
                <div key={index} className={styles.note}>
                  <button
                    className={styles.timestamp}
                    onClick={() => {
                      setVideoTime(note.timestamp);
                    }}
                  >
                    {secondsToTime(note.timestamp)}
                  </button>
                  <div className={styles.content}>{note.content}</div>
                </div>
              );
            })}
            <div ref={scrollElement}></div>
          </div>
          <form className={styles.form} onSubmit={handleSubmitNote}>
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
      </div>
    </Layout>
  );
}
