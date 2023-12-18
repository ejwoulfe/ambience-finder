import { Suspense } from "react";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import "./video-list.scss";
import { VideoRow } from "../../components/video-row/video-row";
import { useLoaderData, Await } from "react-router-dom";

export default function VideoList() {
  const { list } = useLoaderData();

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
