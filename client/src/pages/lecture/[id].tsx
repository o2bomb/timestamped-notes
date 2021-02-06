import React, { FormEvent, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import Layout from "../../components/Layout";
import {
  useAddNoteMutation,
  useGetLectureQuery,
} from "../../generated/graphql";
import { getIdFromUrl } from "../../utils/getIdFromUrl";
import { secondsToTime } from "../../utils/secondsToTime";

import styles from "../../styles/Lecture.module.css";


const Lecture: React.FC = ({}) => {
  // FORM STUFF
  const [value, setValue] = useState("");
  const [target, setTarget] = useState<any>();
  const scrollElement = useRef<HTMLDivElement>(null);
  // DATA LOADING
  const id = getIdFromUrl();
  const { data, error, loading } = useGetLectureQuery({
    skip: id === -1,
    variables: {
      id,
    },
  });
  const [addNote] = useAddNoteMutation();

  const setVideoTime = (timestamp: number) => {
    if (target === undefined || target === null) {
      return;
    }
    target.seekTo(timestamp);
  };

  useEffect(() => {
    scrollElement.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmitNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTimestamp = Math.round(target.getCurrentTime());

    await addNote({
      variables: {
        id,
        content: value,
        timestamp: currentTimestamp,
      },
    });

    setValue("");
    scrollElement.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <Layout>Loading lecture...</Layout>;
  }

  if (error || !data?.getLecture) {
    return <Layout>Error in fetching lecture data</Layout>;
  }

  const { youtubeVideoId, notes } = data.getLecture;

  return (
    <Layout variant="large">
      <div className={styles.container}>
        <YouTube
          containerClassName={styles.video}
          videoId={youtubeVideoId}
          onReady={(e) => {
            setTarget(e.target);
            // console.log(e.target);
          }}
        />
        <div className={styles.notesSection}>
          <div className={styles.list}>
            {notes.map((note, index) => {
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
            <button type="submit" aria-label="Submit new note">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Lecture;
