/**
 * SOURCE:
 *  - https://stackoverflow.com/a/27728417
 * @param videoUrl 
 */
export const getYouTubeVideoId = (videoUrl: string) => {
  let rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const r = videoUrl.match(rx);
  
  if (!r) {
    return;
  }
  return r[1];
}
