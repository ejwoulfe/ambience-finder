import { defer } from "react-router-dom";
import { fetchVideosWithKeyword } from "../helpers/fetchVideos";

// loader
export const videosLoader = async ({ params }) => {
  const keyword = params.keyword;
  const list = await fetchVideosWithKeyword(keyword);
  return defer({ list });
};
