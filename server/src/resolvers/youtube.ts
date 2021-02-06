import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";
import { google } from "googleapis";
import { getYouTubeVideoId } from "../utils/getYouTubeVideoId";
import { getYouTubeVideoThumbnailUrl } from "../utils/getYouTubeVideoThumbnailUrl";

const youtube = google.youtube("v3");

@ObjectType()
class YouTubeVideo {
  @Field()
  title!: string;
  
  @Field()
  thumbnailUrl!: string;
}

@Resolver(YouTubeVideo)
export class YouTubeResolver {
  @Query(() => YouTubeVideo, { nullable: true })
  async youtube(
    @Arg("videoUrl", () => String) videoUrl: string
  ): Promise<YouTubeVideo | undefined> {
    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
      return;
    }

    const response = await youtube.videos.list({
      auth: process.env.YOUTUBE_DATA_API_KEY,
      id: [videoId],
      part: ["id", "snippet"]
    })

    if (!response.data.items) {
      return;
    }
    
    const { snippet } = response.data.items[0];

    return {
      title: snippet?.title as string,
      thumbnailUrl: getYouTubeVideoThumbnailUrl(snippet?.thumbnails)
    };
  }
}
