import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  useCreateLectureMutation,
  useGetYouTubeVideoLazyQuery,
} from "../generated/graphql";

import styles from "../styles/CreateLecture.module.css";
import { debounce } from "../utils/debounce";

const CreateLecture: React.FC = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [
    getYouTubeVideo,
    { data, loading, error },
  ] = useGetYouTubeVideoLazyQuery();
  const [createLecture] = useCreateLectureMutation();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const debouncedGetYouTubeVideo = useCallback(
    debounce((val: string) => {
      if (val.length > 0) {
        getYouTubeVideo({
          variables: {
            videoUrl: val,
          },
        });
      }
    }, 1000),
    []
  );

  const preview = () => {
    if (videoUrl.length === 0) {
      return;
    }

    if (loading) {
      return "Loading preview...";
    }

    if (error || !data?.youtube) {
      return "Error in fetching video data from URL. Perhaps the URL is incorrect?";
    }

    const { title, thumbnailUrl } = data.youtube;

    return (
      <>
        <div className={styles.title}>{title}</div>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          <img
            className={styles.thumbnail}
            src={thumbnailUrl}
            alt={`Thumbnail image for ${title}`}
          />
        </a>
        <button className={styles.submit} onClick={async () => {
          try {
            const response = await createLecture({
              variables: {
                videoUrl,
                thumbnailUrl,
                title
              }
            })
  
            let isSuccess = !!response.data?.createLecture;
            if (isSuccess) {
              router.push("/");
              // display toast
              console.log("Created new lecture successfully");
            }
          } catch (e) {
            // display error toast
            console.log(e.graphQLErrors[0].message);
          }
        }}>
          Create lecture
        </button>
      </>
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            getYouTubeVideo({
              variables: {
                videoUrl,
              },
            });
          }}
        >
          <label htmlFor="videoUrl">YouTube video URL</label>
          <input
            className={styles.input}
            id="videoUrl"
            type="text"
            placeholder="Insert a YouTube video URL here..."
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              debouncedGetYouTubeVideo(e.target.value);
            }}
          />
        </form>
        {preview()}
      </div>
    </Layout>
  );
};

export default CreateLecture;
