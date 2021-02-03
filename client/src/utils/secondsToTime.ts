/**
 * SOURCE:
 * - https://stackoverflow.com/a/61335543
 * @param e 
 */
export const secondsToTime = (e: number) => {
  const h = Math.floor(e / 3600).toString().padStart(2,'0');
  const m = Math.floor(e % 3600 / 60).toString().padStart(2,'0');
  const s = Math.floor(e % 60).toString().padStart(2,'0');
  
  return h + ':' + m + ':' + s;
}
