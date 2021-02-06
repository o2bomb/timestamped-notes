import { youtube_v3 } from "googleapis";

export const getYouTubeVideoThumbnailUrl = (
  thumbnails: youtube_v3.Schema$ThumbnailDetails | undefined
) => {
  return thumbnails?.maxres?.url || thumbnails?.standard?.url || thumbnails?.high?.url || thumbnails?.medium?.url || thumbnails?.default?.url || "";
};
