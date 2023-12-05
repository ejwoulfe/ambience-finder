import { Suspense, useEffect } from "react";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import "./video-list.scss";
import { VideoRow } from "../../components/video-row/video-row";

import { fetchVideosWithKeyword } from "../../helpers/fetchVideos";
import { defer, useLoaderData, Await } from "react-router-dom";

export default function VideoList() {
  const { list } = useLoaderData();
  // const [videosList, setVideosList] = useState<Array<YoutubeVideoDetailsObject>>([]);
  // const { keyword } = useParams();

  // useEffect(() => {
  //   if (keyword !== undefined) {
  //     fetchVideos(keyword, setVideosList);
  //   }
  // }, [keyword]);
  // <ul className="videos__list">
  //   {videosList.map((video: YoutubeVideoDetailsObject, index) => {
  //     const duration = videosList[index].contentDetails.duration;
  //     const props = { video, duration, index };
  //     return <VideoRow key={"video-row-" + index} {...props} />;
  //   })}
  // </ul>;

  return (
    <section>
      <Suspense fallback={<p>Loading Videos.....</p>}>
        <Await resolve={list}>
          {(list) =>
            list.map((video: YoutubeVideoDetailsObject, index: number) => {
              const duration = list[index].contentDetails.duration;
              const props = { video, duration, index };
              return <VideoRow key={"video-row-" + index} {...props} />;
            })
          }
        </Await>
      </Suspense>
    </section>
  );
}

// loader
export const videosLoader = async ({ params }) => {
  const keyword = params.keyword;
  const list = await fetchVideosWithKeyword(keyword);
  console.log(list);
  return defer({ list });
};
