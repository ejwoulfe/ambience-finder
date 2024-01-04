import { defer } from "react-router-dom";
import { fetchVideoWithID } from "../helpers/fetchVideos";

// loader
export const videoLoader = async ({ params }) => {
  console.log(params);
  const id = params.id;
  const videoData = await fetchVideoWithID(id);
  return defer({ videoData });
};
