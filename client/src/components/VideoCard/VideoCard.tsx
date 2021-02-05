import React from 'react'
import Link from "next/link";
import { Lecture } from '../../generated/graphql';

import styles from "./VideoCard.module.css";

interface VideoCardProps extends Lecture {

}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  thumbnailUrl,
}) => {
  return (
    <Link href={`/lecture/${id}`} passHref>
      <a>
        <div className={styles.card}>
          <img src={thumbnailUrl} alt={`Thumbnail image for ${title}`}/>
          <div>{title}</div>
        </div>
      </a>
    </Link>
  );
}

export default VideoCard;