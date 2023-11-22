import { useEffect, useState } from "react";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import "./video-list.scss";
import { VideoRow } from "../../components/video-row/video-row";
import { useParams } from "react-router";
import { fetchVideos } from "../../helpers/fetchVideos";

export default function VideoList() {
  const [videosList, setVideosList] = useState<Array<YoutubeVideoDetailsObject>>([]);
  const { keyword } = useParams();

  useEffect(() => {
    if (keyword !== undefined) {
      fetchVideos(keyword, setVideosList);
    }
  }, [keyword]);

  return (
    <div className="videos-container">
      {videosList.length > 0 ? (
        <ul className="videos__list">
          {videosList.map((video: YoutubeVideoDetailsObject, index) => {
            const duration = videosList[index].contentDetails.duration;
            const props = { video, duration, index };
            return <VideoRow key={"video-row-" + index} {...props} />;
          })}
        </ul>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
